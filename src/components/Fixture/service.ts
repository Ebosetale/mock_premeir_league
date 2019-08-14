import * as Joi from "joi";
import FixtureValidation from "./validation";
import FixtureModel, { IFixtureModel, FixtureStatus } from "./model";
import { IFixtureService } from "./interface";
import Utils from "../../utils";
import RedisCache from "../../cache";

/**
 * @export
 * @implements {IFixtureService}
 */
const FixtureService: IFixtureService = {
  /**
   * @param {IFixtureModel} body
   * @returns {Promise <IFixtureModel>}
   * @memberof FixtureService
   */
  async createFixture(body: IFixtureModel): Promise<IFixtureModel> {
    try {
      const validate: Joi.ValidationResult<
        IFixtureModel
      > = FixtureValidation.createFixture(body);

      if (validate.error) {
        throw new Error(validate.error.message);
      }
      body.status =
        body.status === undefined || body.status === null
          ? FixtureStatus[0]
          : body.status;
      body.url = await Utils.generateUrl(
        body.title,
        body.category,
        `${body.time}`,
        body.status
      );

      const fixture: IFixtureModel = new FixtureModel({
        ...body
      });

      const saved: IFixtureModel = await fixture.save();
      return saved;
    } catch (error) {
      if (error.message && error.message.indexOf("duplicate key") != -1) {
        throw new Error("Fixture already registered");
      }
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} fixtureId
   * @returns {Promise<IFixtureModel>}
   * @memberof FixtureService
   */
  async getFixture(fixtureId: string): Promise<IFixtureModel> {
    try {
      if (fixtureId === null || fixtureId.trim() === "") {
        throw new Error("A valid fixture Id is required for this operation");
      }

      const fixture = FixtureModel.findById(fixtureId);
      if (fixture === null) {
        throw new Error(`Fixture with Id ${fixtureId} could not be found`);
      }
      return fixture;
    } catch (error) {
      throw new Error(error);
    }
  },

  /**
   * @returns {Promise<IFixtureModel[]>}
   * @memberof FixtureService
   */
  async findAll(status: string, page: number): Promise<IFixtureModel[]> {
    try {
      const pageSize = 1;
      const actualPage = !isNaN(page) && page > 0 ? page - 1 : 0;
      const skip = pageSize * actualPage;
      const actualStatus =
        status !== null && status.trim() !== "" ? status.toLowerCase() : "";
      const isValidStatus = FixtureStatus.indexOf(actualStatus) != -1;

      const query = isValidStatus
        ? {
            status: actualStatus
          }
        : {};
      const fixtures = await FixtureModel.find(query)
        .skip(skip)
        .limit(pageSize);
      return fixtures;
    } catch (error) {
      throw new Error(error);
    }
  },

  /**
   * @param {IFixtureModel} IFixtureModel
   * @returns {Promise<IFixtureModel>}
   * @memberof FixtureService
   */
  async modifyFixture(IFixtureModel: IFixtureModel): Promise<IFixtureModel> {
    try {
      const validate: Joi.ValidationResult<
        IFixtureModel
      > = FixtureValidation.modifyFixture(IFixtureModel);

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      let fixture: IFixtureModel = await FixtureModel.findById(
        IFixtureModel._id
      );
      if (fixture === undefined || fixture === null) {
        throw new Error(`Fixture with Id ${IFixtureModel._id} not found`);
      }
      if (
        IFixtureModel.status === null ||
        FixtureStatus.indexOf(IFixtureModel.status.toLowerCase()) == -1
      ) {
        IFixtureModel.status = FixtureStatus[0];
      }
      IFixtureModel.url = await Utils.generateUrl(
        IFixtureModel.title,
        IFixtureModel.category,
        `${IFixtureModel.time}`,
        IFixtureModel.status
      );
      let updateFixture: IFixtureModel = Object.assign(fixture, {
        ...IFixtureModel
      });
      updateFixture.save();
      return updateFixture;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {IFixtureModel} IFixtureModel
   * @returns {Promise<IFixtureModel[]>}
   * @memberof FixtureService
   */
  async searchFixture(IFixtureModel: IFixtureModel): Promise<IFixtureModel> {
    try {
      const validate: Joi.ValidationResult<
        IFixtureModel
      > = FixtureValidation.searchFixture(IFixtureModel);

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      let { tags, category, status } = IFixtureModel;
      if (status === null || status.trim() === "") status = FixtureStatus[0];
      const key = await Utils.generateKey(`${tags}${category}${status}`);

      // let see if we can find it in cache
      const cached = await RedisCache.get(key);
      if (cached !== null && cached.trim() !== "") {
        return JSON.parse(cached);
      }

      // was not found. let's check the db.
      const searchString = (<any>Object).values(IFixtureModel).join(" ");
      const fixtures = await FixtureModel.find(
        {
          $text: { $search: searchString }
        },
        { score: { $meta: "textScore" } }
      )
        .sort({ score: { $meta: "textScore" } })
        .limit(1);

      // if found save to cache. no need to wait for this.
      if (fixtures.length > 0) {
        RedisCache.set(key, fixtures[0]);
      }
      return fixtures[0];
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {string} fixtureId
   * @returns {Promise<IFixtureModel>}
   * @memberof FixtureService
   */
  async removeFixture(fixtureId: string): Promise<IFixtureModel> {
    try {
      if (fixtureId === null || fixtureId.trim() === "") {
        throw new Error("A valid fixture Id is required for this operation");
      }

      const fixture = await FixtureModel.findByIdAndDelete(fixtureId);
      return fixture;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async clearCache(): Promise<string[]> {
    const keys = RedisCache.clearCache();
    return keys;
  }
};

export default FixtureService;
