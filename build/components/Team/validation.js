"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
const validation_1 = require("../validation");
/**
 * @export
 * @class AuthValidation
 * @extends Validation
 */
class TeamValidation extends validation_1.default {
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
    createTeam(params) {
        const schema = Joi.object().keys({
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
    searchTeam(params) {
        const schema = Joi.object().keys({
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
exports.default = new TeamValidation();
//# sourceMappingURL=validation.js.map