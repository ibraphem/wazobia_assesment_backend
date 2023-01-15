import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken, generateVerificationToken, siteUrl } from "../utils.js";
import { sendVerificationMail } from "../services/emailService.js";

export const registerUser = async (payload) => {
  const user = await User.findOne({ email: payload?.email });
  if (user) {
    return { status: false, message: "This email already exist", data: null };
  }
  const newUser = new User({
    first_name: payload.first_name,
    last_name: payload.last_name,
    email: payload.email,
    password: bcrypt.hashSync(payload.password),
    verificationCode: generateVerificationToken(),
  });

  try {
    const user = await newUser.save();
    let link = `${siteUrl}/email/verify/${user?.verificationCode}`;
    sendVerificationMail(user.first_name, user.email, link);
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
  } catch (error) {
    return { status: false, message: error?.message, data: error };
  }
};

export const signIn = async (payload) => {
  try {
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
  } catch (error) {
    return { status: false, message: error?.message, data: error };
  }
};

export const verifyEmail = async (code) => {
  try {
    const user = await User.findOne({ verificationCode: code });
    if (user) {
      user.emailVerificationStatus = true;
      user.emailVerificationDate = new Date();
      const updatedUser = await user.save();
      return {
        status: true,
        message: "Email verified successfully",
        data: {
          user: {
            _id: updatedUser.id,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            email: updatedUser.email,
            emailVerificationStatus: updatedUser?.emailVerificationStatus,
            emailVerificationDate: updatedUser.emailVerificationDate,
          },
        },
      };
    } else {
      return {
        status: false,
        message: "This code is invalid or does not exist",
        data: null,
      };
    }
  } catch (error) {
    return { status: false, message: error?.message, data: error };
  }
};

export const resendVerificationMail = async (id) => {
  try {
    const user = await User.findOne({ _id: id });
    if (user) {
      if (user?.emailVerificationStatus) {
        return {
          status: false,
          message: "This email has already being verified",
          data: null,
        };
      } else {
        let link = `${siteUrl}/email/verify/${user?.verificationCode}`;
        sendVerificationMail(user.first_name, user.email, link);
        return { status: true, message: "Verification Email has been resent", data: null };
      }
    } else {
      return { status: false, message: "User does not exist", data: null };
    }
  } catch {
    return { status: false, message: error?.message, data: error };
  }
};
