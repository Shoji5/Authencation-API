import { NextFunction, Request, Response } from "express";
import Joi, { any } from "joi";
import { nextTick } from "process";
import User from "../models/user.model";

const schema = Joi.object({
  name: Joi.string().min(3).max(30),
  bio: Joi.string().max(60),
  phone: Joi.string().pattern(
    /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/
  ),
  email: Joi.string().email(),
  password: Joi.string().alphanum().min(3).max(30),
});

export async function validateUserUpdate(req: Request, res: Response, next: NextFunction) {
  const { error } = schema.validate(req.body);
  const info = req.user as any;
  if (req.body.email && req.body.email != info.email) {
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.json({ success: false, msg: "Email already exists" });
  }
  if (error) return res.json({ success: false, msg: error.details[0].message });
  next();
}
