"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./../components/Fixture/model");
const model_2 = require("../components/Team/model");
const model_3 = require("../components/Fixture/model");
const model_4 = require("../components/User/model");
class TestUtil {
    constructor() {
        this.createTestTeam = () => {
            return new model_2.default({
                email: "test@email.com",
                name: "test team",
                stadium: "test stadium",
                points: 2,
                memberCount: 3,
                netWorth: 100
            });
        };
        this.createTestTeamSearch = () => {
            return new model_2.default({
                email: "test@email.com",
                name: "test team"
            });
        };
    }
    createTestFixture() {
        return new model_3.default({
            title: "Test fixture title 1",
            category: "English",
            venue: "test venue",
            time: new Date(),
            tags: "test tags"
        });
    }
    createTestSearchFixture() {
        return new model_3.default({
            category: "English",
            tags: "test tags",
            status: model_1.FixtureStatus[0]
        });
    }
    createUser() {
        return new model_4.default({
            email: "test@mail.com",
            password: "test123"
        });
    }
}
exports.default = new TestUtil();
//# sourceMappingURL=Utils.js.map