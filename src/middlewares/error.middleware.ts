import { NextFunction, Request, Response } from "express";
import HttpException from "../utils/exception";
import { logger } from "../utils/logger";


const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || "Something went wrong";

    logger.error(
      `[${req.method}] ${req.path}  >> StatusCode:: ${status}, Message:: ${message}`
    );
    res.status(status).send({status: 'error', error: message, data: null});
  } catch (error) {
    logger.error(`[${req.method}] ${req.path}  >> StatusCode:: 500, Message:: unexpected error occurred`)
  }
};

export default errorMiddleware;