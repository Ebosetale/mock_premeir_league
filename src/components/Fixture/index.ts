import FixtureService from "./service";
import HttpError from "../../config/error";
import { IFixtureModel } from "./model";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import app from "../../config/server/server";

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function addFixture(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const fixture = await FixtureService.createFixture(req.body);
    res.status(201).json(fixture);
  } catch (error) {
    if (error.code === 500) {
      return next(new HttpError(error.message.status, error.message));
    }
    res.json({
      status: 400,
      message: error.message
    });
  }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function modifyFixture(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const fixture = await FixtureService.modifyFixture(req.body);
    res.status(200).json(fixture);
  } catch (error) {
    if (error.code === 500) {
      return next(new HttpError(error.message.status, error.message));
    }
    res.json({
      status: 400,
      message: error.message
    });
  }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function getFixture(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const fixture = await FixtureService.getFixture(req.params.id);
    res.status(200).json(fixture);
  } catch (error) {
    if (error.code === 500) {
      return next(new HttpError(error.message.status, error.message));
    }
    res.json({
      status: 400,
      message: error.message
    });
  }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function deleteFixture(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const fixture = await FixtureService.removeFixture(req.params.id);
    res.status(201).json(fixture);
  } catch (error) {
    if (error.code === 500) {
      return next(new HttpError(error.message.status, error.message));
    }
    res.json({
      status: 400,
      message: error.message
    });
  }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function searchFixture(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const fixtures = await FixtureService.searchFixture(req.body);

    res.status(200).json(fixtures !== undefined ? fixtures : []);
  } catch (error) {
    if (error.code === 500) {
      return next(new HttpError(error.message.status, error.message));
    }
    res.json({
      status: 400,
      message: error.message
    });
  }
}

/**
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise < void >}
 */
export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const fixtures = await FixtureService.findAll(
      req.params.status,
      req.params.page
    );
    res.status(200).json(fixtures);
  } catch (error) {
    if (error.code === 500) {
      return next(new HttpError(error.message.status, error.message));
    }
    res.json({
      status: 400,
      message: error.message
    });
  }
}
