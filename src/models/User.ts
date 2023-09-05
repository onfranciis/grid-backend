import { Model, model, Schema } from "mongoose";

import { User } from "../types/Models.types";

const userSchema = new Schema<User, Model<User>>({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone_number: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  service: {
    isSuspended: {
      type: Boolean,
      default: false,
    },
    ConfirmationCode: {
      type: String,
    },
    isConfirmed: { type: Boolean, default: false },
    joined: {
      type: Date,
      default: Date.now(),
    },
  },
});

export default model("User", userSchema);
