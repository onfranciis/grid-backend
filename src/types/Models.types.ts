import { Document } from "mongoose";

export interface User extends Document {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  service: {
    isSuspended: boolean;
    confirmationCode: string;
    isConfirmed: boolean;
  };
}

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}
