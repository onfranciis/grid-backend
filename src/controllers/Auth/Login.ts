import LoginMiddleware from "../../middlewares/Login.middlewares";
import User from "../../models/User";
import { Controller } from "../../types/Controllers.types";
import bcrypt from "bcrypt";

export const Login: Controller = {
  path: "/auth/login",
  method: "post",
  handler: async (req, res) => {
    LoginMiddleware(req, res).then((data) => {
      try {
        if (data === true) {
          const { password, email } = req.body;
          User.findOne({ email }).then((data) => {
            console.log(data);
            if (data) {
              const comparedPassword = bcrypt.compareSync(
                password,
                data.password
              );

              if (comparedPassword) {
                res.send({
                  result: data.service,
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
