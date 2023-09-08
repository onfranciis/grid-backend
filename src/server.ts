import mongoose from "mongoose";
import config, { environment } from "./config";
import app from "./app";

mongoose
  .connect(config.dbUrl)
  .then(() => {
    app.listen(config.port, () => {
      console.log(
        `... ${environment} server has started on port ${config.port}`
      );
    });
  })
  .catch((err) => {
    console.error("Connection to the database failed! \n", err);
  });
