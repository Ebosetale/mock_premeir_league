import * as connections from "../../config/connection/connection";
import { Document, Schema } from "mongoose";

/**
 * @export
 * @interface ITeamModel
 * @extends {Document}
 */
export interface ITeamModel extends Document {
  email: string;
  name: string;
  stadium: string;
  points: number;
  memberCount: number;
  netWorth: number;
}

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
const TeamSchema: Schema = new Schema(
  {
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
  },
  {
    collection: "TeamsCollection",
    versionKey: false
  }
).set("versionKey", false);

const index = { email: "text", name: "text" };
TeamSchema.index(index);

export default connections.db.model<ITeamModel>("TeamModel", TeamSchema);
