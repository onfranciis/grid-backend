import { RegisterMiddleware } from "../../middlewares/Auth.middlewares";
import User from "../../models/User";
import { Controller } from "../../types/Controllers.types";

export const Register: Controller = {
  path: "/auth/register",
  method: "post",
  handler: async (req, res) => {
    RegisterMiddleware(req, res).then((data) => {
      if (data === true) {
        const newUser = new User({ ...req.body });

        try {
          newUser.save().then((data) => {
            res.send({
              message: `${data.email} has been registered successfully`,
            });
          });
        } catch (err) {
          console.log(err);
        }
      }
    });
  },
};
