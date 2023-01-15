import express from "express";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils";

const userRoutes = express.Router();

userRoutes.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const result = await registerUser(req?.body);
    res.send({
      status: true,
      message: "User is registered successfully",
      data: {
        user: {
          _id: result.id,
          first_name: result.first_name,
          last_name: result.last_name,
          email: result.email,
          emailVerificationStatus: result?.emailVerificationStatus,
          emailVerificationDate: result.emailVerificationDate,
        },
        token: generateToken(result)
      },
    });
  })
);

export default userRoutes;
