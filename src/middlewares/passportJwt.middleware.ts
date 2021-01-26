import {
  facebook_id,
  facebook_secret,
  github_id,
  github_secret,
  google_id,
  google_secret,
  secret,
} from "./../config/index.config";
import passport from "passport";
import { ExtractJwt, Strategy as JWTStrategy, StrategyOptions } from "passport-jwt";
import User from "../models/user.model";
import FacebookTokenStrategy from "passport-facebook-token";
var GithubTokenStrategy = require("passport-github-token");
var GoogleTokenStrategy = require("passport-google-token").Strategy;

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

passport.use(
  new JWTStrategy(opts, async function (jwt_payload, done) {
    let user = await User.findById(jwt_payload.id);
    done(null, user);
  })
);

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: google_id,
      clientSecret: google_secret,
    },
    function (accessToken: any, refreshToken: any, profile: any, done: any): void {
      done(null, profile._json);
    }
  )
);

passport.use(
  new FacebookTokenStrategy(
    {
      clientID: facebook_id,
      clientSecret: facebook_secret,
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, { ...profile._json, image: profile.photos[0].value });
    }
  )
);
passport.use(
  new GithubTokenStrategy(
    {
      clientID: github_id,
      clientSecret: github_secret,
      passReqToCallback: true,
    },
    function (req: any, accessToken: any, refreshToken: any, profile: any, next: any) {
      next(null, profile._json);
    }
  )
);

export default passport;
