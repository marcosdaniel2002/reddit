import { User } from "../models/userModel.js";

export class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json({
        status: "success",
        data: users,
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  }

  static createUser(req, res) {
    res.status(500).json({
      status: "error",
      message: "This route not yet defined! Please use /signup instead",
    });
  }
}
