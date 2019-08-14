"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const components_1 = require("../components");
const jwtConfig = require("../config/middleware/jwtAuth");
/**
 * @constant {express.Router}
 */
const router = express_1.Router();
/**
 * GET method route
 * @example http://localhost:PORT/v1/teams
 *
 * @swagger
 * /v1/teams/{page}:
 *   get:
 *     description: Get stored teams in Database.
 *     tags: ["teams"]
 *     security:
 *      - ApiKeyAuth: []
 *     parameters:
 *      - in: path
 *        name: page
 *        description: the page number
 *        required: true
 *        schema:
 *          type: number
 *     responses:
 *       200:
 *         description: An array of Teams
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/schemas/Teams'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.get("/:page", jwtConfig.isAuthenticated, components_1.TeamComponent.findAll);
/**
 * POST method route
 * @example http://localhost:PORT/v1/teams
 *
 * @swagger
 * /v1/teams:
 *   post:
 *      description: Create new Team
 *      tags: ["teams"]
 *      security:
 *       - ApiKeyAuth: []
 *      requestBody:
 *        description: team creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TeamSchema'
 *            example:
 *              name: Crystal Palace
 *              email: c.palace@mail.com
 *              address: london
 *      responses:
 *        201:
 *          description: return created team
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/TeamSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post("/", jwtConfig.isAdminAuthenticated, components_1.TeamComponent.addTeam);
/**
 * PUT method route
 * @example http://localhost:PORT/v1/teams/:id
 *
 * @swagger
 * /v1/teams/{id}:
 *   put:
 *      description: update team information
 *      tags: ["teams"]
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          description: the unique teamId
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        description: update team information
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TeamSchema'
 *            example:
 *              name: Crystal Palace
 *              email: c.palace@mail.com
 *              address: london
 *      responses:
 *        201:
 *          description: return updated team
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/TeamSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.put("/:id", jwtConfig.isAdminAuthenticated, components_1.TeamComponent.modifyTeam);
/**
 * GET method route
 * @example http://localhost:PORT/v1/teams/:id
 *
 * @swagger
 * /v1/teams/{id}:
 *  get:
 *    description: Get team by teamId
 *    tags: ["teams"]
 *    security:
 *      - ApiKeyAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique teamId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return team by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/TeamSchema'
 */
router.get("/:id", jwtConfig.isAuthenticated, components_1.TeamComponent.findOne);
/**
 * POST method route
 * @example http://localhost:PORT/v1/teams
 *
 * @swagger
 * /v1/teams/search:
 *   post:
 *      description: Search Team
 *      tags: ["teams"]
 *      security:
 *       - ApiKeyAuth: []
 *      requestBody:
 *        description: team search request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TeamSchema'
 *            example:
 *              name: Crystal Palace
 *              email: c.palace@mail.com
 *              address: london
 *      responses:
 *        200:
 *          description: return searched team
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/TeamSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post("/search", components_1.TeamComponent.searchTeam);
/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/teams/:id
 *
 * @swagger
 * /v1/teams/{id}:
 *  delete:
 *    description: Delete team by teamId
 *    tags: ["teams"]
 *    security:
 *      - ApiKeyAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique teamId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return deleted team
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/TeamSchema'
 */
router.delete("/:id", jwtConfig.isAdminAuthenticated, components_1.TeamComponent.deleteTeam);
/**
 * @export {express.Router}
 */
exports.default = router;
//# sourceMappingURL=TeamRouter.js.map