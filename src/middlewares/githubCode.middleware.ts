import { NextFunction, Request, Response } from "express";
import { github_id, github_secret } from "../config/index.config";
import axios from "axios";
import queryString from "query-string";

export async function GithubCode(req: Request, res: Response, next: NextFunction) {
  const result = await axios.post("https://github.com/login/oauth/access_token", {
    client_id: github_id,
    client_secret: github_secret,
    code: req.body.code,
  });
  req.body.access_token = queryString.parse(result.data).access_token;
  next();
}
