import { type Request, type Response, type NextFunction } from "express";

export const jsonErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof SyntaxError && "status" in err && err.status === 400) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Invalid JSON payload provided. Please check for trailing commas or unquoted keys."
    });
  }

  next(err);
};