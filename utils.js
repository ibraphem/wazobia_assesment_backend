import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign(
      {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
  };