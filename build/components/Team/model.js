"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connections = require("../../config/connection/connection");
const mongoose_1 = require("mongoose");
/**
 * @swagger
 * components:
 *  schemas:
 *    TeamSchema:
 *      required:
 *        - email
 *        - name
 *        - stadium
 *        - points
 *        - memberCount
 *        - netWorth
 *      properties:
 *        id:
 *          type: string
 *        name:
 *          type: string
 *        email:
 *          type: string
 *        stadium:
 *          type: string
 *        points:
 *          type: number
 *        memberCount:
 *          type: number
 *        netWorth:
 *          type: number
 *    Teams:
 *      type: array
 *      items:
 *        $ref: '#/components/Team/TeamSchema'
 */
const TeamSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        unique: true,
        trim: true
    },
    stadium: String,
    points: Number,
    memberCount: Number,
    netWorth: Number
}, {
    collection: "TeamsCollection",
    versionKey: false
}).set("versionKey", false);
const index = { email: "text", name: "text" };
TeamSchema.index(index);
exports.default = connections.db.model("TeamModel", TeamSchema);
//# sourceMappingURL=model.js.map