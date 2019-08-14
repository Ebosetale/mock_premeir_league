"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connections = require("../../config/connection/connection");
const mongoose_1 = require("mongoose");
// Allowed value for fixture status.
exports.FixtureStatus = ["pending", "completed"];
/**
 * @swagger
 * components:
 *  schemas:
 *    FixtureSchema:
 *      required:
 *        - title
 *        - category
 *        - venue
 *        - time
 *        - status
 *        - url
 *        - score
 *        - url
 *        - tags
 *      properties:
 *        id:
 *          type: string
 *        title:
 *          type: string
 *        category:
 *          type: string
 *        venue:
 *          type: string
 *        status:
 *          type: FixtureStatus
 *        time:
 *          type: string
 *          format: date
 *        score:
 *          type: string
 *        url:
 *          type: string
 *        tags:
 *          type: string
 *    Fixtures:
 *      type: array
 *      items:
 *        $ref: '#/components/Fixture/FixtureSchema'
 */
const FixtureSchema = new mongoose_1.Schema({
    title: {
        type: String,
        unique: true,
        trim: true
    },
    url: {
        type: String,
        unique: true,
        trim: true
    },
    category: String,
    venue: String,
    time: Date,
    status: String,
    score: String,
    tags: String
}, {
    collection: "FixtureCollection",
    versionKey: false
}).set("versionKey", false);
const index = {
    title: "text",
    category: "text",
    venue: "text",
    tags: "text"
};
FixtureSchema.index(index);
exports.default = connections.db.model("FixtureModel", FixtureSchema);
//# sourceMappingURL=model.js.map