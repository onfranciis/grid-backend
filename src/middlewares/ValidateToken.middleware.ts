import { NextFunction, Request, Response } from "express";
import { User } from "../types/Models.types";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

export default async (
  req: Request<User>,
  res: Response,
  next: NextFunction
) => {
  try {
    const GridToken = req.headers.cookie
      ?.split("; ")
      .find((value) => value.startsWith("token-grid"));
    const token = GridToken?.replace("token-grid=", "");

    if (!token) {
      res.status(403).send({
        result: null,
        message: "",
        error: "You have no token!",
      });
    } else {
      jwt.verify(token, config.jwtSecret, (err, result) => {
        if (result) {
          next();
        } else {
          res.status(401).send({
            result: null,
            message: "",
            error: "Expired token!",
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      result: null,
      message: "",
      error: "Something went wrong!",
    });
  }
};
