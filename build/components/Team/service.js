"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cache_1 = require("../../cache");
const model_1 = require("./model");
const validation_1 = require("./validation");
const utils_1 = require("../../utils");
/**
 * @export
 * @implements {IAuthService}
 */
const TeamService = {
    /**
     * @param {ITeamModel} body
     * @returns {Promise <ITeamModel>}
     * @memberof AuthService
     */
    addTeam(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = validation_1.default.createTeam(body);
                if (validate.error) {
                    throw new Error(validate.error.message);
                }
                const team = new model_1.default({
                    email: body.email,
                    name: body.name,
                    stadium: body.stadium,
                    points: body.points,
                    memberCount: body.memberCount,
                    netWorth: body.netWorth
                });
                const saved = yield team.save();
                return saved;
            }
            catch (error) {
                if (error.message && error.message.indexOf("duplicate key") != -1) {
                    throw new Error("Team already registered");
                }
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {ITeamModel} ITeamModel
     * @returns {Promise<ITeamModel[]>}
     * @memberof TeamService
     */
    findAll(page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pageSize = 10;
                const actualPage = !isNaN(page) && page > 0 ? page - 1 : 0;
                const skip = pageSize * actualPage;
                return yield model_1.default.find({})
                    .skip(skip)
                    .limit(pageSize);
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {ITeamModel} body
     * @returns {Promise <ITeamModel>}
     * @memberof AuthService
     */
    getTeam(teamId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (teamId === null || teamId.trim() === "") {
                    throw new Error("A valid team Id is required for this operation");
                }
                const team = yield model_1.default.findById(teamId);
                if (team !== null) {
                    return team;
                }
                throw new Error("Team not found");
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {teamId} string
     * @returns {Promise<ITeamModel>}
     * @memberof TeamService
     */
    deleteTeam(teamId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (teamId === null || teamId.trim() === "") {
                    throw new Error("A valid team Id is required for this operation");
                }
                const team = yield model_1.default.findByIdAndRemove(teamId);
                return team;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {ITeamModel} ITeamModel
     * @returns {Promise<ITeamModel[]>}
     * @memberof TeamService
     */
    searchTeam(ITeamModel) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = validation_1.default.searchTeam(ITeamModel);
                if (validate.error) {
                    throw new Error(validate.error.message);
                }
                // check if in cache.
                const key = yield utils_1.default.generateKey(`${ITeamModel.name}${ITeamModel.email}`);
                const cached = yield cache_1.default.get(key);
                if (cached !== null && cached.trim() !== "") {
                    return JSON.parse(cached);
                }
                const searchString = Object.values(ITeamModel).join(" ");
                const teams = yield model_1.default.find({
                    $text: { $search: searchString }
                }, { score: { $meta: "textScore" } })
                    .sort({ score: { $meta: "textScore" } }
                // $or: [{ name: ITeamModel.name }, { email: ITeamModel.email }]
                )
                    .limit(1);
                if (teams !== null && teams.length > 0) {
                    cache_1.default.set(key, teams[0]);
                }
                return teams[0];
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {ITeamModel} ITeamModel
     * @returns {Promise<ITeamModel>}
     * @memberof TeamService
     */
    modifyTeam(ITeamModel, teamId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = validation_1.default.createTeam(ITeamModel);
                if (validate.error) {
                    throw new Error(validate.error.message);
                }
                let team = yield model_1.default.findById(teamId);
                if (team !== null) {
                    team = yield model_1.default.findByIdAndUpdate({ _id: team._id }, ITeamModel);
                }
                else {
                    ITeamModel = yield TeamService.addTeam(ITeamModel);
                }
                return ITeamModel;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
};
exports.default = TeamService;
//# sourceMappingURL=service.js.map