import bcrypt from "bcrypt";
import RegisterMiddleware from "../../middlewares/Register.middlewares";
import User from "../../models/User";
import { Controller } from "../../types/Controllers.types";

export const Register: Controller = {
  path: "/auth/register",
  method: "post",
  handler: async (req, res) => {
    RegisterMiddleware(req, res).then((data) => {
      try {
        console.log(data);
        if (data === true) {
          const hashedPassword = bcrypt.hashSync(req.body.password, 10);
          const newUser = new User({ ...req.body, password: hashedPassword });

          newUser.save().then((data) => {
            res.status(201).send({
              result: data._id,
              message: `${data.email} has been registered successfully`,
              error: null,
            });
          });
        } else {
          res.status(500).send({
            result: null,
            message: "",
            error: "Something went wrong!",
          });
        }
      } catch (err) {
        res.status(500).send({
          result: null,
          message: "",
          error: "Something went wrong!",
        });
      }
    });
  },
};
