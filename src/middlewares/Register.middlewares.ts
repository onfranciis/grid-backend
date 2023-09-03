import { Response } from "express";
import { TypedRequestBody, User } from "../types/Models.types";
import UserModel from "../models/User";

const RegisterMiddleware = async (
  req: TypedRequestBody<User>,
  res: Response
) => {
  try {
    const {
      first_name,
      last_name,
      password,
      email,
      phone_number,
      ...otherBody
    } = req.body;
    if (!first_name) {
      return res
        .status(400)
        .send({ message: "", result: null, error: "firstname not found!" });
    }

    if (!last_name) {
      return res
        .status(400)
        .send({ message: "", result: null, error: "last_name not found!" });
    }

    if (!password) {
      return res
        .status(400)
        .send({ message: "", result: null, error: "password not found!" });
    } else if (password.trim().length < 8) {
      return res.status(400).send({
        message: "",
        result: null,
        error: "password should not be less than 8 characters!",
      });
    }

    if (!email) {
      return res
        .status(400)
        .send({ message: "", result: null, error: "email not found!" });
    } else {
      const result = await UserModel.findOne({ email });

      if (result) {
        return res.status(409).send({
          message: "",
          result: null,
          error: "Email already exists!",
        });
      }
    }

    if (!phone_number) {
      return res
        .status(400)
        .send({ message: "", result: null, error: "phone_nummber not found!" });
    } else if (isNaN(parseInt(phone_number)) || parseInt(phone_number) < 1) {
      return res.status(400).send({
        message: "",
        result: null,
        error: "phone_nummber doesn't seem valid!",
      });
    } else {
      const result = await UserModel.findOne({ phone_number });

      if (result) {
        return res.status(409).send({
          message: "",
          result: null,
          error: "Phone number already exists!",
        });
      }
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

export default RegisterMiddleware;
