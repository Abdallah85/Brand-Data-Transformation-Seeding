import express from "express";
import connectDatabase from "./database";
import dotenv from "dotenv";
import { validateBrands } from "./service/transform-brands";

dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

async function main(): Promise<void> {
  await connectDatabase();
  await validateBrands();
}
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

main().catch((error) => {
  console.error("Error during initialization:", error);
  process.exit(1);
});
