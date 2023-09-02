import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ connected: true });
});

export default app;
