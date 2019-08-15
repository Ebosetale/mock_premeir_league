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
 * @example http://localhost:PORT/v1/fixtures/all/1
 *
 * @swagger
 * /v1/fixtures/{page}/{status}:
 *   get:
 *     description: Get all stored fixtures in Database
 *     tags: ["fixtures"]
 *     security:
 *        - ApiKeyAuth: []
 *     parameters:
 *        - in: path
 *          name: status
 *          description: fixture status. can be all, pending or completed
 *          required: false
 *          schema:
 *            type: string
 *        - in: path
 *          name: page
 *          description: page
 *          required: true
 *          schema:
 *            type: number
 *     responses:
 *       200:
 *         description: An array of fixtures
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                - $ref: '#/components/Fixture/FixtureSchema'
 *       default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/Fixture/Error'
 */
router.get("/:status/:page", jwtConfig.isAuthenticated, components_1.FixtureComponent.findAll);
/**
 * POST method route
 * @example http://localhost:PORT/v1/fixtures
 *
 * @swagger
 * /v1/fixtures:
 *   post:
 *      description: Create new Fixture
 *      tags: ["fixtures"]
 *      security:
 *       - ApiKeyAuth: []
 *      requestBody:
 *        description: fixture creation request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/fixtureSchema'
 *            example:
 *              title: West Ham United vs Manchester City new,
 *              time: 2019-11-07T23:00:00.000Z,
 *              category: English,
 *              status: pending,
 *              tags: football, premier league, Mcty
 *      responses:
 *        201:
 *          description: return created fixture
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/fixtureSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post("/", jwtConfig.isAdminAuthenticated, components_1.FixtureComponent.addFixture);
/**
 * POST method route
 * @example http://localhost:PORT/v1/fixtures
 *
 * @swagger
 * /v1/fixtures/search:
 *   post:
 *      description: search Fixture
 *      tags: ["fixtures"]
 *      security:
 *       - ApiKeyAuth: []
 *      requestBody:
 *        description: fixture search request body
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/fixtureSchema'
 *            example:
 *              category: English,
 *              status: pending,
 *              tags: football, premier league, Mcty
 *      responses:
 *        201:
 *          description: return searched fixture
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/fixtureSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.post("/search", components_1.FixtureComponent.searchFixture);
/**
 * PUT method route
 * @example http://localhost:PORT/v1/fixtures/5d50892f10679a652d80f9c2
 *
 * @swagger
 * /v1/fixtures:
 *   put:
 *      description: Modify an existing fixture
 *      tags: ["fixtures"]
 *      security:
 *       - ApiKeyAuth: []
 *      requestBody:
 *        description: upgrade fixture role to admin
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/fixtureSchema'
 *            example:
 *              title: West Ham United vs Manchester City
 *              time: 19:30
 *      responses:
 *        201:
 *          description: return updated fixture
 *          content:
 *            application/json:
 *              schema:
 *                oneOf:
 *                  - $ref: '#/components/schemas/fixtureSchema'
 *        default:
 *          description: unexpected error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
router.put("/", jwtConfig.isAdminAuthenticated, components_1.FixtureComponent.modifyFixture);
/**
 * GET method route
 * @example http://localhost:PORT/v1/fixtures/:id
 *
 * @swagger
 * /v1/fixtures/{id}:
 *  get:
 *    description: Get fixture by fixtureId
 *    tags: ["fixtures"]
 *    security:
 *      - ApiKeyAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique fixtureId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return fixture by id
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/fixtureSchema'
 */
router.get("/:id", jwtConfig.isAuthenticated, components_1.FixtureComponent.getFixture);
/**
 * DELETE method route
 * @example  http://localhost:PORT/v1/fixtures/:id
 *
 * @swagger
 * /v1/fixtures/{id}:
 *  delete:
 *    description: Delete fixture by fixtureId
 *    tags: ["fixtures"]
 *    security:
 *      - ApiKeyAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        description: the unique fixtureId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: return deleted fixture
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - $ref: '#/components/schemas/fixtureSchema'
 */
router.delete("/:id", jwtConfig.isAdminAuthenticated, components_1.FixtureComponent.deleteFixture);
/**
 * @export {express.Router}
 */
exports.default = router;
//# sourceMappingURL=FixtureRouter.js.map