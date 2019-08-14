"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const server_1 = require("../server/server");
const error_1 = require("../error");
const http = require("http");
/**
 *
 * @param {RequestWithUser} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 * @swagger
 *  components:
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: x-access-token
 */
function isAuthenticated(req, res, next) {
    const token = req.headers["x-access-token"];
    if (token) {
        try {
            const user = jwt.verify(token, server_1.default.get("secret"));
            req.user = user;
            return next();
        }
        catch (error) {
            return next(new error_1.default(401, http.STATUS_CODES[401]));
        }
    }
    return next(new error_1.default(400, "No token provided"));
}
exports.isAuthenticated = isAuthenticated;
/**
 *
 * @param {RequestWithUser} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 * @swagger
 *  components:
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: x-access-token
 */
function isAdminAuthenticated(req, res, next) {
    const token = req.headers["x-access-token"];
    if (token) {
        try {
            const user = jwt.verify(token, server_1.default.get("secret"));
            req.user = user;
            if (user === null) {
                return next(new error_1.default(401, http.STATUS_CODES[401]));
            }
            const m = user;
            if (m.roles.indexOf("admin") == -1)
                return next(new error_1.default(401, http.STATUS_CODES[401]));
            return next();
        }
        catch (error) {
            return next(new error_1.default(401, http.STATUS_CODES[401]));
        }
    }
    return next(new error_1.default(400, "No token provided"));
}
exports.isAdminAuthenticated = isAdminAuthenticated;
function isAdmin(eq, res, next) {
    console.log(eq);
}
exports.isAdmin = isAdmin;
//# sourceMappingURL=jwtAuth.js.map