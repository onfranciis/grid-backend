import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import LoginMiddleware from "../../middlewares/Login.middlewares";
import User from "../../models/User";
import { Controller } from "../../types/Controllers.types";

export const Login: Controller = {
  path: "/auth/login",
  method: "post",
  handler: async (req, res) => {
    LoginMiddleware(req, res).then((data) => {
      try {
        if (data === true) {
          const { password, email } = req.body;
          User.findOne({ email })
            .select(["+password", "-__v"])
            .then((data) => {
              if (data) {
                const { password: existingPassword, ...mainData } =
                  data.toObject();

                const comparedPassword = bcrypt.compareSync(
                  password,
                  existingPassword
                );

                const token = jwt.sign(data.toObject(), config.dbUrl, {
                  expiresIn: "10m",
                });

                if (comparedPassword) {
                  res
                    .cookie("token-grid", token, {
                      expires: new Date(Date.now() + 2592000000), // 30 days in milliseconds
                      httpOnly: true,
                      path: "/",
                    })
                    .send({
                      result: { ...mainData, token },
                      message: `Successfully logged user ${data._id}`,
                      error: null,
                    });
                } else {
                  res.status(401).send({
                    result: null,
                    message: "",
                    error: "Email or password not found!",
                  });
                }
              } else {
                res.status(401).send({
                  result: null,
                  message: "",
                  error: "Email or password not found!",
                });
              }
            });
        } else {
          throw Error;
        }
      } catch (error) {
        console.log(error);
        res.status(500).send({
          result: null,
          message: "Something went wrong!",
          error: null,
        });
      }
    });
  },
};
