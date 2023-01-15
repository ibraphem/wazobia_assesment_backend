import express from "express";
import expressAsyncHandler from "express-async-handler";
import { registerUser, signIn } from "../controllers/userController.js";
import { generateToken } from "../utils.js";

const userRoutes = express.Router();

userRoutes.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const result = await registerUser(req?.body);
    res.send(result)
  })
);

userRoutes.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const result = await signIn(req?.body)
    res.send(result)
  })
);

export default userRoutes;
