import { NextFunction, Request, Response } from "express";

export const errorHandler =
  (method: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error) {
      if (error.message && !error.message.includes("Endpoint doesn't exist")) {
        console.log(error);
      }
      res.status(error.statusCode ?? 400).json({
        message: error.message,
        code: error.errorCode,
        meta: error.meta,
        errors: error.errors,
      });
    }
  };
