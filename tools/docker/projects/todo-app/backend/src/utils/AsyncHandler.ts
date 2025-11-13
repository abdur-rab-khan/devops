import type { Request, Response, NextFunction } from "express";

export default function AsyncHandler(callback: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(callback(req, res, next)).catch(next);
  };
}
