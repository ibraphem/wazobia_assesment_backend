import express from "express";
import expressAsyncHandler from "express-async-handler";
import { registerUser, resendVerificationMail, signIn, verifyEmail } from "../controllers/userController.js";
import { isAuth } from "../utils.js";


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
    const result = await signIn(req?.body);
    console.log('result', result);
    res.send(result)
  })
);

userRoutes.get(
  "/resend-verification-mail",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const result = await resendVerificationMail(req.user._id)
    res.send(result)
  })
);

userRoutes.get(
  "/verify/:code",
  expressAsyncHandler(async (req, res) => {
    const result = await verifyEmail(req.params.code)
    res.send(result)
  })
);

export default userRoutes;
