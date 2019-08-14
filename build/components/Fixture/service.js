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
const validation_1 = require("./validation");
const model_1 = require("./model");
const utils_1 = require("../../utils");
const cache_1 = require("../../cache");
/**
 * @export
 * @implements {IFixtureService}
 */
const FixtureService = {
    /**
     * @param {IFixtureModel} body
     * @returns {Promise <IFixtureModel>}
     * @memberof FixtureService
     */
    createFixture(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = validation_1.default.createFixture(body);
                if (validate.error) {
                    throw new Error(validate.error.message);
                }
                body.status =
                    body.status === undefined || body.status === null
                        ? model_1.FixtureStatus[0]
                        : body.status;
                body.url = yield utils_1.default.generateUrl(body.title, body.category, `${body.time}`, body.status);
                const fixture = new model_1.default(Object.assign({}, body));
                const saved = yield fixture.save();
                return saved;
            }
            catch (error) {
                if (error.message && error.message.indexOf("duplicate key") != -1) {
                    throw new Error("Fixture already registered");
                }
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {string} fixtureId
     * @returns {Promise<IFixtureModel>}
     * @memberof FixtureService
     */
    getFixture(fixtureId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (fixtureId === null || fixtureId.trim() === "") {
                    throw new Error("A valid fixture Id is required for this operation");
                }
                const fixture = model_1.default.findById(fixtureId);
                if (fixture === null) {
                    throw new Error(`Fixture with Id ${fixtureId} could not be found`);
                }
                return fixture;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    },
    /**
     * @returns {Promise<IFixtureModel[]>}
     * @memberof FixtureService
     */
    findAll(status, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pageSize = 1;
                const actualPage = !isNaN(page) && page > 0 ? page - 1 : 0;
                const skip = pageSize * actualPage;
                const actualStatus = status !== null && status.trim() !== "" ? status.toLowerCase() : "";
                const isValidStatus = model_1.FixtureStatus.indexOf(actualStatus) != -1;
                const query = isValidStatus
                    ? {
                        status: actualStatus
                    }
                    : {};
                const fixtures = yield model_1.default.find(query)
                    .skip(skip)
                    .limit(pageSize);
                return fixtures;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    },
    /**
     * @param {IFixtureModel} IFixtureModel
     * @returns {Promise<IFixtureModel>}
     * @memberof FixtureService
     */
    modifyFixture(IFixtureModel) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = validation_1.default.modifyFixture(IFixtureModel);
                if (validate.error) {
                    throw new Error(validate.error.message);
                }
                let fixture = yield model_1.default.findById(IFixtureModel._id);
                if (fixture === undefined || fixture === null) {
                    throw new Error(`Fixture with Id ${IFixtureModel._id} not found`);
                }
                if (IFixtureModel.status === null ||
                    model_1.FixtureStatus.indexOf(IFixtureModel.status.toLowerCase()) == -1) {
                    IFixtureModel.status = model_1.FixtureStatus[0];
                }
                IFixtureModel.url = yield utils_1.default.generateUrl(IFixtureModel.title, IFixtureModel.category, `${IFixtureModel.time}`, IFixtureModel.status);
                let updateFixture = Object.assign(fixture, Object.assign({}, IFixtureModel));
                updateFixture.save();
                return updateFixture;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {IFixtureModel} IFixtureModel
     * @returns {Promise<IFixtureModel[]>}
     * @memberof FixtureService
     */
    searchFixture(IFixtureModel) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validate = validation_1.default.searchFixture(IFixtureModel);
                if (validate.error) {
                    throw new Error(validate.error.message);
                }
                let { tags, category, status } = IFixtureModel;
                if (status === null || status.trim() === "")
                    status = model_1.FixtureStatus[0];
                const key = yield utils_1.default.generateKey(`${tags}${category}${status}`);
                // let see if we can find it in cache
                const cached = yield cache_1.default.get(key);
                if (cached !== null && cached.trim() !== "") {
                    return JSON.parse(cached);
                }
                // was not found. let's check the db.
                const searchString = Object.values(IFixtureModel).join(" ");
                const fixtures = yield model_1.default.find({
                    $text: { $search: searchString }
                }, { score: { $meta: "textScore" } })
                    .sort({ score: { $meta: "textScore" } })
                    .limit(1);
                // if found save to cache. no need to wait for this.
                if (fixtures.length > 0) {
                    cache_1.default.set(key, fixtures[0]);
                }
                return fixtures[0];
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    /**
     * @param {string} fixtureId
     * @returns {Promise<IFixtureModel>}
     * @memberof FixtureService
     */
    removeFixture(fixtureId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (fixtureId === null || fixtureId.trim() === "") {
                    throw new Error("A valid fixture Id is required for this operation");
                }
                const fixture = yield model_1.default.findByIdAndDelete(fixtureId);
                return fixture;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    },
    clearCache() {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = cache_1.default.clearCache();
            return keys;
        });
    }
};
exports.default = FixtureService;
//# sourceMappingURL=service.js.map