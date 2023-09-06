import User from "../models/User";
import { Controller } from "../types/Controllers.types";

export const Users: Controller = {
  path: "/users",
  method: "get",
  handler: async (req, res) => {
    const users = await User.find().select(["-__v"]);

    res.send({
      result: users,
      message: "",
      error: null,
    });
  },
};
