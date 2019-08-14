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
const model_1 = require("./../components/Fixture/model");
const Utils_1 = require("./Utils");
const service_1 = require("../components/Fixture/service");
describe("Fixture servide test", () => {
    describe("Can add a fixture to the db", () => {
        it("should add a fixture to the database, generate a link called URL and return the fixture", () => __awaiter(this, void 0, void 0, function* () {
            const addedFixture = yield service_1.default.createFixture(Utils_1.default.createTestFixture().toObject());
            expect(addedFixture).toHaveProperty("_id");
            expect(addedFixture.url).not.toBeNull();
            yield service_1.default.removeFixture(`${addedFixture._id}`);
        }));
    });
    describe("Can get a fixture by id", () => {
        it("should get a fixture using it's id", () => __awaiter(this, void 0, void 0, function* () {
            const addedFixture = yield service_1.default.createFixture(Utils_1.default.createTestFixture().toObject());
            expect(addedFixture).toHaveProperty("_id");
            expect(addedFixture.url).not.toBeNull();
            yield service_1.default.removeFixture(`${addedFixture._id}`);
        }));
    });
    describe("fixture to be deleted from the db", () => {
        it("should remove a fixture from the database and returned the deleted fixture", () => __awaiter(this, void 0, void 0, function* () {
            const addedFixture = yield service_1.default.createFixture(Utils_1.default.createTestFixture().toObject());
            const deleted = yield service_1.default.removeFixture(`${addedFixture._id}`);
            expect(deleted).toHaveProperty("_id");
        }));
    });
    describe("fixture can be searched", () => {
        it("should search for fixture from the database using key words and returned the fixture", () => __awaiter(this, void 0, void 0, function* () {
            const addedFixture = yield service_1.default.createFixture(Utils_1.default.createTestFixture().toObject());
            const searchTerm = Utils_1.default.createTestSearchFixture();
            delete searchTerm._id;
            const searched = yield service_1.default.searchFixture(searchTerm.toObject());
            expect(searched).toHaveProperty("_id");
            expect(searched.tags).toContain(searchTerm.tags);
            expect(searched.status).toContain(searchTerm.status);
            const deleted = yield service_1.default.removeFixture(`${addedFixture._id}`);
        }));
    });
    describe("fixture to be modified in the db", () => {
        it("should modify a fixture from the database and returned the deleted fixture", () => __awaiter(this, void 0, void 0, function* () {
            const addedFixture = yield service_1.default.createFixture(Utils_1.default.createTestFixture().toObject());
            addedFixture.status = model_1.FixtureStatus[1];
            const modified = yield service_1.default.modifyFixture(addedFixture.toObject());
            expect(modified).toHaveProperty("_id");
            expect(modified.status).toEqual(model_1.FixtureStatus[1]);
            const deleted = yield service_1.default.removeFixture(`${addedFixture._id}`);
        }));
    });
});
//# sourceMappingURL=fixtures.service.test.js.map