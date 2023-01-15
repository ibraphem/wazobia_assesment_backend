import User from "../models/userModel.js";
import bcrypt from "bcryptjs";


export const registerUser = async(payload) => {
    const newUser = new User({
        _id: payload.id,
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        password: bcrypt.hashSync(payload.password),
      });
  
      const user = await newUser.save();
      return user
}