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
const Utils_1 = require("./Utils");
const service_1 = require("../components/Team/service");
describe("TeamService testing", () => {
    afterEach(() => { });
    describe("Team can be deleted by Id", () => {
        it("should delete a team and returns the id", () => __awaiter(this, void 0, void 0, function* () {
            const res = yield service_1.default.addTeam(Utils_1.default.createTestTeam().toObject());
            const del = yield service_1.default.deleteTeam(`${res._id}`);
            expect(del).toHaveProperty("_id");
        }));
    });
    describe("Team can be updated", () => {
        it("should modify an existing team", () => __awaiter(this, void 0, void 0, function* () {
            const res = yield service_1.default.addTeam(Utils_1.default.createTestTeam().toObject());
            res.points = 400;
            const updated = yield service_1.default.modifyTeam(res.toObject(), res._id);
            expect(updated).toHaveProperty("_id");
            expect(updated.points).toEqual(400);
            const del = yield service_1.default.deleteTeam(`${res._id}`);
        }));
    });
    describe("Team can be searched by name and email", () => {
        it("should return a team that has the email and name", () => __awaiter(this, void 0, void 0, function* () {
            const res = yield service_1.default.addTeam(Utils_1.default.createTestTeam().toObject());
            const searchTerm = Utils_1.default.createTestTeamSearch();
            const searched = yield service_1.default.searchTeam(searchTerm.toObject());
            expect(searched.name).toContain(searchTerm.name);
            expect(searched.email).toContain(searchTerm.email);
            const del = yield service_1.default.deleteTeam(`${res._id}`);
        }));
    });
    describe("When adding a team", () => {
        describe("if team name and other information is not registered already", () => {
            it("should register the team and return the registered team with an Id", () => __awaiter(this, void 0, void 0, function* () {
                const res = yield service_1.default.addTeam(Utils_1.default.createTestTeam().toObject());
                expect(res).toHaveProperty("_id");
                const del = yield service_1.default.deleteTeam(`${res._id}`);
            }));
        });
    });
});
//# sourceMappingURL=teams.service.test.js.map