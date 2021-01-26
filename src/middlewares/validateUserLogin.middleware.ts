import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(3).max(30),
});

export default async function validateUserLogin(req: Request, res: Response, next: NextFunction) {
  let { error } = schema.validate(req.body);
  if (error) return res.json({ success: false, msg: error.details[0].message });
  next();
}
