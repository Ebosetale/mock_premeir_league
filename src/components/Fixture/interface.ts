import { IFixtureModel } from "./model";

/**
 * @export
 * @interaface IFixtureService
 */
export interface IFixtureService {
  /**
   * @param {IFixtureModel} IFixtureModel
   * @returns {Promise<IFixtureModel>}
   * @memberof FixtureService
   */
  createFixture(IFixtureModel: IFixtureModel): Promise<IFixtureModel>;

  clearCache(): Promise<string[]>;

  /**
   * @returns {Promise<IFixtureModel[]>}
   * @memberof FixtureService
   */
  findAll(status: string, page: number): Promise<IFixtureModel[]>;

  /**
   * @param {string} fixtureId
   * @returns {Promise<IFixtureModel>}
   * @memberof FixtureService
   */
  getFixture(fixtureId: string): Promise<IFixtureModel>;

  /**
   * @param {IFixtureModel} IFixtureModel
   * @param string fixtureId
   * @returns {Promise<IFixtureModel>}
   * @memberof FixtureService
   */
  modifyFixture(IFixtureModel: IFixtureModel): Promise<IFixtureModel>;

  /**
   * @param {IFixtureModel} IFixtureModel
   * @returns {Promise<IFixtureModel[]>}
   * @memberof FixtureService
   */
  searchFixture(IFixtureModel: IFixtureModel): Promise<IFixtureModel>;

  /**
   * @param {string} fixtureId
   * @returns {Promise<IFixtureModel>}
   * @memberof FixtureService
   */
  removeFixture(fixtureId: string): Promise<IFixtureModel>;
}
