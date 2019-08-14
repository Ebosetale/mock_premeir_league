"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const jwtConfig = require("../config/middleware/jwtAuth");
const swaggerUi = require("swagger-ui-express");
const AuthRouter_1 = require("./AuthRouter");
const UserRouter_1 = require("./UserRouter");
const TeamRouter_1 = require("./TeamRouter");
const FixtureRouter_1 = require("./FixtureRouter");
let swaggerDoc;
try {
    swaggerDoc = require("../swagger.json");
}
catch (error) {
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
function init(app) {
    const router = express.Router();
    /**
     * @description
     *  Forwards any requests to the /v1/users URI to our UserRouter
     *  Also, check if user authenticated
     * @constructs
     */
    app.use("/v1/users", jwtConfig.isAdminAuthenticated, UserRouter_1.default);
    /**
     * @description Forwards any requests to the /auth URI to our AuthRouter
     * @constructs
     */
    app.use("/auth", AuthRouter_1.default);
    /**
     * @description Forwards any requests to the /teams URI to our TeamRouter
     * @constructs
     */
    app.use("/v1/teams", TeamRouter_1.default);
    /**
     * @description Forwards any requests to the /fixtures URI to our FixtureRouter
     * @constructs
     */
    app.use("/v1/fixtures", FixtureRouter_1.default);
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
            res.send("<p>Welcome to Mock Premier League</p>" +
                "<p><a href='https://documenter.getpostman.com/view/949328/SVYwLx26'>POSTMAN doc</a></p>" +
                "<p><a href='docs'>Swagger Doc</a></p>");
        });
    }
    else {
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
exports.init = init;
//# sourceMappingURL=index.js.map