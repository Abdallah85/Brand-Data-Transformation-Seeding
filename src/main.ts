import express from "express";
import connectDatabase from "./database";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

connectDatabase()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error: Error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
