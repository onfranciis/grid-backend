import { Response } from "express";
import { TypedRequestBody, User } from "../types/Models.types";

const LoginMiddleware = async (req: TypedRequestBody<User>, res: Response) => {
  try {
    const { password, email, ...otherBody } = req.body;

    if (!password) {
      return res
        .status(400)
        .send({ message: "", result: null, error: "password not found!" });
    } else if (password.trim().length < 8) {
      return res.status(411).send({
        message: "",
        result: null,
        error: "password should not be less than 8 characters!",
      });
    }

    if (!email) {
      return res
        .status(400)
        .send({ message: "", result: null, error: "email not found!" });
    }

    if (otherBody) {
      Object.keys(otherBody).forEach((item) => {
        return res.status(400).send({
          message: "",
          result: null,
          error: `${item} was found but not needed`,
        });
      });
    }

    Object.values(otherBody).forEach((item) => {
      if (item.trim() === "") {
        return res.status(400).send({
          message: "",
          result: null,
          error: `${item} should not be empty`,
        });
      }
    });

    return true;
  } catch (error) {
    console.log(error);
  }
};

export default LoginMiddleware;
