import bodyParser from "body-parser";
import express from "express";
import controllers from "./controllers";
import { GlobalErrorHandler } from "./utils/ErrorHandler";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ connected: true });
});

controllers.forEach((controller) => {
  app[controller.method](controller.path, GlobalErrorHandler(controller));
});

app.use((err: any, req: any, res: any, next: any) => {
  console.log("A global error has been caught/n", err);
  res.status(500).send({ error: "Something went wrong!" });
  next();
});

export default app;
