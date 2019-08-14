import * as connections from "../../config/connection/connection";
import { Document, Schema } from "mongoose";

// Allowed value for fixture status.
export const FixtureStatus = ["pending", "completed"];

/**
 * @export
 * @interface IFixtureModel
 * @extends {Document}
 */
export interface IFixtureModel extends Document {
  title: string;
  category: string;
  venue: string;
  time: Date;
  status: string;
  score: string;
  url: string;
  tags: string;
}

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
const FixtureSchema: Schema = new Schema(
  {
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
  },
  {
    collection: "FixtureCollection",
    versionKey: false
  }
).set("versionKey", false);

const index = {
  title: "text",
  category: "text",
  venue: "text",
  tags: "text"
};
FixtureSchema.index(index);

export default connections.db.model<IFixtureModel>(
  "FixtureModel",
  FixtureSchema
);
