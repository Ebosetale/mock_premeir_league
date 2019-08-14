import { ITeamModel } from "./model";
import * as Joi from "joi";
import Validation from "../validation";

/**
 * @export
 * @class AuthValidation
 * @extends Validation
 */
class TeamValidation extends Validation {
  /**
   * Creates an instance of AuthValidation.
   * @memberof AuthValidation
   */
  constructor() {
    super();
  }
  /**
   * @param {ITeamModel} params
   * @returns {Joi.ValidationResult<ITeamModel >}
   * @memberof UserValidation
   */
  createTeam(params: ITeamModel): Joi.ValidationResult<ITeamModel> {
    const schema: Joi.Schema = Joi.object().keys({
      name: Joi.string().required(),
      stadium: Joi.string().required(),
      points: Joi.number()
        .required()
        .min(0),
      memberCount: Joi.number()
        .required()
        .min(1),
      netWorth: Joi.number()
        .required()
        .min(0),
      email: Joi.string()
        .email({
          minDomainAtoms: 2
        })
        .required(),
      _id: Joi.any()
        .allow()
        .optional()
    });

    return Joi.validate(params, schema);
  }
  /**
   * @param {IUserModel} params
   * @returns {Joi.ValidationResult<IUserModel >}
   * @memberof UserValidation
   */
  searchTeam(params: ITeamModel): Joi.ValidationResult<ITeamModel> {
    const schema: Joi.Schema = Joi.object().keys({
      _id: Joi.any()
        .allow()
        .optional(),
      name: Joi.string().required(),
      email: Joi.string()
        .email({
          minDomainAtoms: 2
        })
        .required()
    });

    return Joi.validate(params, schema);
  }
}

export default new TeamValidation();
