import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 1111,
  dbUrl: process.env.DB_URL || "",
  jwtSecret: process.env.DB_URL || "",
};

export default config;
