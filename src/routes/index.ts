import * as express from "express";
import * as http from "http";
import * as jwtConfig from "../config/middleware/jwtAuth";
import * as swaggerUi from "swagger-ui-express";
import AuthRouter from "./AuthRouter";
import UserRouter from "./UserRouter";
import TeamRouter from "./TeamRouter";
import FixtureRouter from "./FixtureRouter";
let swaggerDoc: Object;

try {
  swaggerDoc = require("../swagger.json");
} catch (error) {
  console.log("***************************************************");
  console.log("  Seems like you doesn`t have swagger.json file");
  console.log("  Please, run: ");
  console.log("  $ swagger-jsdoc -d swaggerDef.js -o swagger.json");
  console.log("***************************************************");
}

/**
 * @export
 * @param {express.Application} app
 */
export function init(app: express.Application): void {
  const router: express.Router = express.Router();

  /**
   * @description
   *  Forwards any requests to the /v1/users URI to our UserRouter
   *  Also, check if user authenticated
   * @constructs
   */
  app.use("/v1/users", jwtConfig.isAdminAuthenticated, UserRouter);

  /**
   * @description Forwards any requests to the /auth URI to our AuthRouter
   * @constructs
   */
  app.use("/auth", AuthRouter);

  /**
   * @description Forwards any requests to the /teams URI to our TeamRouter
   * @constructs
   */
  app.use("/v1/teams",  TeamRouter);

  /**
   * @description Forwards any requests to the /fixtures URI to our FixtureRouter
   * @constructs
   */
  app.use("/v1/fixtures", FixtureRouter);

  /**
   * @description
   *  If swagger.json file exists in root folder, shows swagger api description
   *  else send commands, how to get swagger.json file
   * @constructs
   */
  if (swaggerDoc) {
    app.use("/docs", swaggerUi.serve);
    app.get("/docs", swaggerUi.setup(swaggerDoc));
    app.get("/", (req, res) => {
      res.send(
        "<p>Welcome to Mock Premier League</p>" +
          "<p><a href='https://documenter.getpostman.com/view/949328/SVYwLx26'>POSTMAN doc</a></p>" +
          "<p><a href='docs'>Swagger Doc</a></p>"
      );
    });
  } else {
    app.get("/docs", (req, res) => {
      res.send("<p><a href=''>POSTMAN doc</a></p>");
    });
  }

  /**
   * @description No results returned mean the object is not found
   * @constructs
   */
  app.use((req, res, next) => {
    res.status(404).send(http.STATUS_CODES[404]);
  });

  /**
   * @constructs all routes
   */
  app.use(router);
}
