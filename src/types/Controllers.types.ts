import express, { RequestHandler } from "express";
const app = express();

export interface Controller {
  path: string;
  method: keyof typeof app;
  handler: RequestHandler;
}
