import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import User from "../models/user.model";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(3).max(30).required(),
});

export default async function validateUserRegister(req: Request, res: Response, next: NextFunction) {
  let { error } = schema.validate(req.body);
  if (error) return res.json({ success: false, msg: error.details[0].message });
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.json({ success: false, msg: "Email already exists" });
    next();
  } catch (err) {
    res.json({ success: false, msg: err });
  }
}
