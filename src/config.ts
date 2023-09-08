import dotenv from "dotenv";
dotenv.config();

const environment = process.env.ENVIRONMENT || "development";

const config = {
  port: process.env.PORT || 1111,
  jwtSecret: process.env.DB_URL || "",

  dbUrl:
    environment == "development"
      ? process.env.DEV_DB_URL || ""
      : process.env.PROD_DB_URL || "",
};

export default config;
export { environment };
