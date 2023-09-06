import bodyParser from "body-parser";
import express from "express";
import cookieParser from "cookie-parser";
import Controllers from "./controllers";
import AuthControllers from "./controllers/auth";
import { GlobalErrorHandler } from "./utils/ErrorHandler";
import ValidateTokenMiddleware from "./middlewares/ValidateToken.middleware";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send({ connected: true });
});

AuthControllers.forEach((controller) => {
  app[controller.method](controller.path, GlobalErrorHandler(controller));
});

app.use(ValidateTokenMiddleware);

Controllers.forEach((controller) => {
  app[controller.method](controller.path, GlobalErrorHandler(controller));
});

app.use((err: any, req: any, res: any, next: any) => {
  console.log("A global error has been caught/n", err);
  res.status(500).send({ error: "Something went wrong!" });
  next();
});

export default app;
