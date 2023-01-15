import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log("databaseee errorrrrr", err.message));

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`serve at http:localhost:${port}`);
});