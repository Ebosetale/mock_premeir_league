import { ITeamModel } from "./model";

/**
 * @export
 * @interaface ITeamService
 */
export interface ITeamService {
  /**
   * @param {ITeamModel} ITeamModel
   * @returns {Promise<ITeamModel>}
   * @memberof TeamService
   */
  addTeam(ITeamModel: ITeamModel): Promise<ITeamModel>;

  /**
   * @param {teamId} string
   * @returns {Promise<ITeamModel>}
   * @memberof TeamService
   */
  getTeam(teamId: string): Promise<ITeamModel>;

  /**
   * @param {teamId} string
   * @returns {Promise<ITeamModel>}
   * @memberof TeamService
   */
  deleteTeam(teamId: string): Promise<ITeamModel>;

  /**
   * @param {ITeamModel} ITeamModel
   * @returns {Promise<ITeamModel[]>}
   * @memberof TeamService
   */
  searchTeam(ITeamModel: ITeamModel): Promise<ITeamModel>;

  /**
   * @param {ITeamModel} ITeamModel
   * @returns {Promise<ITeamModel[]>}
   * @memberof TeamService
   */
  findAll(page: number): Promise<ITeamModel[]>;

  /**
   * @param {ITeamModel} ITeamModel
   * @param string teamId
   * @returns {Promise<ITeamModel>}
   * @memberof TeamService
   */
  modifyTeam(ITeamModel: ITeamModel, teamId: string): Promise<ITeamModel>;
}
