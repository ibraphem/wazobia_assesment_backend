import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";

export const registerUser = async (payload) => {
  console.log(payload);
  const newUser = new User({
    first_name: payload.first_name,
    last_name: payload.last_name,
    email: payload.email,
    password: bcrypt.hashSync(payload.password),
  });

  try{
    const user = await newUser.save();
  return {
    status: true,
    message: "User is registered successfully",
    data: {
      user: {
        _id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        emailVerificationStatus: user?.emailVerificationStatus,
        emailVerificationDate: user.emailVerificationDate,
      },
      token: generateToken(user),
    },
  };
  } catch(error) {
    return { status: false, message: error?.message, data: error };
  }
};

export const signIn = async (payload) => {

    try{
        const user = await User.findOne({ email: payload?.email });
        if (user) {
          if (bcrypt.compareSync(payload?.password, user.password)) {
            return {
              status: true,
              message: "User logged in successfully",
              data: {
                user: {
                  _id: user.id,
                  first_name: user.first_name,
                  last_name: user.last_name,
                  email: user.email,
                  emailVerificationStatus: user?.emailVerificationStatus,
                  emailVerificationDate: user.emailVerificationDate,
                },
                token: generateToken(result),
              },
            };
          } else {
            return { status: false, message: "Incorrect Credentials", data: null };
          }
        } else {
          return { status: false, message: "User Not found", data: null };
        }
    } catch(error) {
         return { status: false, message: error?.message, data: error };
    }
 
};
