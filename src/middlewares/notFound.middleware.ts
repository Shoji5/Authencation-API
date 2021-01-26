import { NextFunction, Request, Response, Router } from "express";

const notFound = Router();

notFound.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ success: false, msg: "NOT_FOUND" });
});

export default notFound;
