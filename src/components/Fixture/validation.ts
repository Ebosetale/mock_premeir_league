import * as Joi from "joi";
import Validation from "../validation";
import { IFixtureModel } from "./model";

/**
 * @export
 * @class AuthValidation
 * @extends Validation
 */
class FixtureValidation extends Validation {
  /**
   * Creates an instance of AuthValidation.
   * @memberof FixtureValidation
   */
  constructor() {
    super();
  }
  /**
   * @param {IFixtureModel} params
   * @returns {Joi.ValidationResult<IFixtureModel >}
   * @memberof FixtureValidation
   */

  createFixture(params: IFixtureModel): Joi.ValidationResult<IFixtureModel> {
    const schema: Joi.Schema = Joi.object().keys({
      title: Joi.string()
        .required()
        .max(50),
      category: Joi.string()
        .required()
        .max(10),
      venue: Joi.string().required(),
      time: Joi.date()
        .required()
        .optional(),
      tags: Joi.string().required(),
      _id: Joi.any()
        .allow()
        .optional()
    });
    return Joi.validate(params, schema);
  }

  /**
   * @param {IFixtureModel} params
   * @returns {Joi.ValidationResult<IFixtureModel >}
   * @memberof FixtureValidation
   */

  modifyFixture(params: IFixtureModel): Joi.ValidationResult<IFixtureModel> {
    const schema: Joi.Schema = Joi.object().keys({
      title: Joi.string()
        .required()
        .max(50),
      category: Joi.string()
        .required()
        .max(10),
      venue: Joi.string().required(),
      time: Joi.date().required(),
      tags: Joi.string().required(),
      _id: Joi.any().required(),
      status: Joi.string().required(),
      url: Joi.string().required()
    });
    return Joi.validate(params, schema);
  }
  /**
   * @param {IFixtureModel} params
   * @returns {Joi.ValidationResult<IFixtureModel >}
   * @memberof FixtureValidation
   */
  searchFixture(params: IFixtureModel): Joi.ValidationResult<IFixtureModel> {
    const schema: Joi.Schema = Joi.object().keys({
      tags: Joi.string().required(),
      category: Joi.string().required(),
      status: Joi.string().required(),
      _id: Joi.any()
        .required()
        .optional()
    });

    return Joi.validate(params, schema);
  }
}

export default new FixtureValidation();
