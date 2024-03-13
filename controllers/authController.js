import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const signToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = function (user, statusCode, req, res) {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  };
  res.cookie("jwt", token, cookieOptions);

  // remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: user,
  });
};

export class AuthController {
  static async signUp(req, res) {
    try {
      const { name, email, password, passwordConfirm } = req.body;
      const newUser = await User.create({
        name,
        email,
        password,
        passwordConfirm,
      });

      createSendToken(newUser, 201, req, res);
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  }
}
