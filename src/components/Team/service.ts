import RedisCache from "../../cache";
import TeamModel, { ITeamModel } from "./model";
import * as Joi from "joi";
import TeamValidation from "./validation";
import { ITeamService } from "./interface";
import { Types } from "mongoose";
import Utils from "../../utils";

/**
 * @export
 * @implements {IAuthService}
 */
const TeamService: ITeamService = {
  /**
   * @param {ITeamModel} body
   * @returns {Promise <ITeamModel>}
   * @memberof AuthService
   */
  async addTeam(body: ITeamModel): Promise<ITeamModel> {
    try {
      const validate: Joi.ValidationResult<
        ITeamModel
      > = TeamValidation.createTeam(body);

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      const team: ITeamModel = new TeamModel({
        email: body.email,
        name: body.name,
        stadium: body.stadium,
        points: body.points,
        memberCount: body.memberCount,
        netWorth: body.netWorth
      });

      const saved: ITeamModel = await team.save();
      return saved;
    } catch (error) {
      if (error.message && error.message.indexOf("duplicate key") != -1) {
        throw new Error("Team already registered");
      }
      throw new Error(error.message);
    }
  },

  /**
   * @param {ITeamModel} ITeamModel
   * @returns {Promise<ITeamModel[]>}
   * @memberof TeamService
   */
  async findAll(page: number): Promise<ITeamModel[]> {
    try {
      const pageSize = 10;
      const actualPage = !isNaN(page) && page > 0 ? page - 1 : 0;
      const skip = pageSize * actualPage;
      return await TeamModel.find({})
        .skip(skip)
        .limit(pageSize);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {ITeamModel} body
   * @returns {Promise <ITeamModel>}
   * @memberof AuthService
   */
  async getTeam(teamId: string): Promise<ITeamModel> {
    try {
      if (teamId === null || teamId.trim() === "") {
        throw new Error("A valid team Id is required for this operation");
      }

      const team: ITeamModel = await TeamModel.findById(teamId);
      if (team !== null) {
        return team;
      }

      throw new Error("Team not found");
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {teamId} string
   * @returns {Promise<ITeamModel>}
   * @memberof TeamService
   */
  async deleteTeam(teamId: string): Promise<ITeamModel> {
    try {
      if (teamId === null || teamId.trim() === "") {
        throw new Error("A valid team Id is required for this operation");
      }

      const team: ITeamModel = await TeamModel.findByIdAndRemove(teamId);

      return team;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {ITeamModel} ITeamModel
   * @returns {Promise<ITeamModel[]>}
   * @memberof TeamService
   */
  async searchTeam(ITeamModel: ITeamModel): Promise<ITeamModel> {
    try {
      const validate: Joi.ValidationResult<
        ITeamModel
      > = TeamValidation.searchTeam(ITeamModel);

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      // check if in cache.
      const key = await Utils.generateKey(
        `${ITeamModel.name}${ITeamModel.email}`
      );

      const cached = await RedisCache.get(key);
      if (cached !== null && cached.trim() !== "") {
        return JSON.parse(cached);
      }

      const searchString = (<any>Object).values(ITeamModel).join(" ");
      const teams = await TeamModel.find(
        {
          $text: { $search: searchString }
        },
        { score: { $meta: "textScore" } }
      )
        .sort(
          { score: { $meta: "textScore" } }
          // $or: [{ name: ITeamModel.name }, { email: ITeamModel.email }]
        )
        .limit(1);

      if (teams !== null && teams.length > 0) {
        RedisCache.set(key, teams[0]);
      }
      return teams[0];
    } catch (error) {
      throw new Error(error.message);
    }
  },

  /**
   * @param {ITeamModel} ITeamModel
   * @returns {Promise<ITeamModel>}
   * @memberof TeamService
   */
  async modifyTeam(
    ITeamModel: ITeamModel,
    teamId: string
  ): Promise<ITeamModel> {
    try {
      const validate: Joi.ValidationResult<
        ITeamModel
      > = TeamValidation.createTeam(ITeamModel);

      if (validate.error) {
        throw new Error(validate.error.message);
      }

      let team: ITeamModel = await TeamModel.findById(teamId);
      if (team !== null) {
        team = await TeamModel.findByIdAndUpdate({ _id: team._id }, ITeamModel);
      } else {
        ITeamModel = await TeamService.addTeam(ITeamModel);
      }
      return ITeamModel;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export default TeamService;
