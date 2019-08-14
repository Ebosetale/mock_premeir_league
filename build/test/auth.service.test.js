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
const service_1 = require("../components/Auth/service");
const service_2 = require("../components/User/service");
const Utils_1 = require("./Utils");
describe("UserService Test", () => {
    describe("Can add user with a unique email address and password", () => {
        it("should create a new user and return it", () => __awaiter(this, void 0, void 0, function* () {
            const user = yield service_1.default.createUser(Utils_1.default.createUser().toObject());
            expect(user).not.toBeNull();
            expect(user).toHaveProperty("_id");
            yield service_2.default.remove(`${user._id}`);
        }));
    });
    describe("can get a registerd user", () => {
        it("should return a registered user", () => __awaiter(this, void 0, void 0, function* () {
            const user = yield service_1.default.createUser(Utils_1.default.createUser().toObject());
            const fetchedUser = yield service_1.default.getUser(Utils_1.default.createUser().toObject());
            expect(fetchedUser).not.toBeNull();
            expect(fetchedUser).toHaveProperty("_id");
            yield service_2.default.remove(`${fetchedUser._id}`);
        }));
    });
    describe("can delete a registerd user", () => {
        it("should return the deleted user", () => __awaiter(this, void 0, void 0, function* () {
            const createdUser = yield service_1.default.createUser(Utils_1.default.createUser().toObject());
            const deletedUser = yield service_2.default.remove(`${createdUser._id}`);
            expect(deletedUser).not.toBeNull();
            expect(deletedUser).toHaveProperty("_id");
        }));
    });
    describe("can upgrade a registerd user to admin", () => {
        it("should elevate a registered user to admin and return the updated admin", () => __awaiter(this, void 0, void 0, function* () {
            const createdUser = yield service_1.default.createUser(Utils_1.default.createUser().toObject());
            const updtedUser = yield service_2.default.setAdmin(createdUser.toObject());
            expect(updtedUser).not.toBeNull();
            expect(updtedUser.roles).toContain("admin");
            yield service_2.default.remove(`${updtedUser._id}`);
        }));
    });
});
//# sourceMappingURL=auth.service.test.js.map