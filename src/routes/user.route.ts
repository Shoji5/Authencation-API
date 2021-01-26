import { Router } from "express";
import {
  FacebookLogin,
  GithubLogin,
  GoogleLogin,
  updateInfo,
  UserLogin,
  UserRegister,
} from "../controllers/user.controller";
import validateUserLogin from "../middlewares/validateUserLogin.middleware";
import validateUserRegister from "../middlewares/validateUserRegister.middleware";
import passport from "../middlewares/passportJwt.middleware";
import { GithubCode } from "../middlewares/githubCode.middleware";
import { validateUserUpdate } from "../middlewares/validateUserUpdate.middelware";
import upload from "../middlewares/multer.middleware";

const UserRoute = Router();

UserRoute.post("/login/local", validateUserLogin, UserLogin);

UserRoute.post("/login/google", passport.authenticate("google-token", { session: false }), GoogleLogin);

UserRoute.post("/login/facebook", passport.authenticate("facebook-token", { session: false }), FacebookLogin);

UserRoute.post("/login/github", GithubCode, passport.authenticate("github-token", { session: false }), GithubLogin);

UserRoute.post("/register", validateUserRegister, UserRegister);

UserRoute.post(
  "/update",
  upload.single("image"),
  passport.authenticate("jwt", { session: false }),
  validateUserUpdate,
  updateInfo
);

export default UserRoute;
