import { secret, secret_refresh } from "./../config/index.config";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import { uploadImage } from "../utils/cloudinary";
import fs from "fs";

export async function GetInfo(req: Request, res: Response) {
  res.json({ success: true, user: { ...(req.user as IUser).toJSON(), password: undefined } });
}

export async function UserLogin(req: Request, res: Response) {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.json({ success: false, msg: "user doesn't exist" });
  if (!bcrypt.compareSync(req.body.password, user.password)) return res.json({ success: false, msg: "wrong password" });
  let token = jwt.sign({ id: user.id }, secret);
  let refresh_token = jwt.sign({ id: user.id }, secret_refresh);
  res.json({ success: true, user: { ...user.toJSON(), password: undefined }, token, refresh_token });
}

export async function UserRegister(req: Request, res: Response) {
  try {
    await new User({
      domain: "local",
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    }).save();
    res.json({ success: true, msg: "register successful" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, msg: err });
  }
}

export async function updateInfo(req: Request, res: Response) {
  try {
    const info = req.user as any;

    const { name, bio, phone, email, password } = req.body;
    let newData: any = {};
    if (name) newData.name = name;
    if (bio) newData.bio = bio;
    if (phone) newData.phone = phone;
    if (email) newData.email = email;
    if (info.domain === "local" && password) {
      newData.password = bcrypt.hashSync(password, 10);
    }
    if (req.file) {
      newData.image = await uploadImage(req.file.path);
      fs.unlinkSync(req.file.path);
    }
    const user = await User.findByIdAndUpdate(info._id as string, newData, { new: true });
    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false, msg: err });
  }
}

export async function GoogleLogin(req: Request, res: Response) {
  try {
    const info: any = req.user;
    const user = await User.findOne({ uid: info.id });
    if (!user) {
      const newUser = new User({
        name: info.given_name,
        email: info.email,
        uid: info.id,
        domain: "google",
        password: bcrypt.hashSync(info.email, 10),
        image: info.picture,
      });
      await newUser.save();
      let token = jwt.sign({ uid: newUser.uid }, secret);
      let refresh_token = jwt.sign({ uid: newUser.uid }, secret_refresh);
      return res.json({ success: true, user: { ...newUser.toJSON(), password: undefined }, token, refresh_token });
    }
    let token = jwt.sign({ uid: user.uid }, secret);
    let refresh_token = jwt.sign({ uid: user.uid }, secret_refresh);
    res.json({ success: true, user: { ...user.toJSON(), password: undefined }, token, refresh_token });
  } catch (err) {
    res.json({ success: false, msg: err });
  }
}
export async function FacebookLogin(req: Request, res: Response) {
  try {
    const info: any = req.user;
    const user = await User.findOne({ uid: info.id });
    if (!user) {
      const newUser = new User({
        name: info.name,
        email: info.email,
        uid: info.id,
        domain: "facebook",
        password: bcrypt.hashSync(info.email, 10),
        image: info.image,
      });
      await newUser.save();
      let token = jwt.sign({ uid: newUser.uid }, secret);
      let refresh_token = jwt.sign({ uid: newUser.uid }, secret_refresh);
      return res.json({ success: true, user: { ...newUser.toJSON(), password: undefined }, token, refresh_token });
    }
    let token = jwt.sign({ uid: user.uid }, secret);
    let refresh_token = jwt.sign({ uid: user.uid }, secret_refresh);
    res.json({ success: true, user: { ...user.toJSON(), password: undefined }, token, refresh_token });
  } catch (err) {
    res.json({ success: false, msg: err });
  }
}
export async function GithubLogin(req: Request, res: Response) {
  try {
    const info: any = req.user;
    const user = await User.findOne({ uid: info.id });
    if (!user) {
      const newUser = new User({
        name: info.name,
        email: info.email || "",
        uid: info.id,
        domain: "github",
        password: bcrypt.hashSync(info.email || "", 10),
        image: info.avatar_url,
      });
      await newUser.save();
      let token = jwt.sign({ uid: newUser.uid }, secret);
      let refresh_token = jwt.sign({ uid: newUser.uid }, secret_refresh);
      return res.json({ success: true, user: { ...newUser.toJSON(), password: undefined }, token, refresh_token });
    }
    let token = jwt.sign({ uid: user.uid }, secret);
    let refresh_token = jwt.sign({ uid: user.uid }, secret_refresh);
    res.json({ success: true, user: { ...user.toJSON(), password: undefined }, token, refresh_token });
  } catch (err) {
    res.json({ success: false, msg: err });
  }
}
