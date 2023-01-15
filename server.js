import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

const app = express();

dotenv.config();

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors());

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
  });

  app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected to DB"))
  .catch((err) => console.log("databaseee errorrrrr", err.message));

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`serve at http:localhost:${port}`);
});


