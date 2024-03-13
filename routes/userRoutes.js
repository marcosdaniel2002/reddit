import express from "express";
import { UserController } from "../controllers/userController.js";
import { AuthController } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", AuthController.signUp);

router
  .route("/")
  .get(UserController.getAllUsers)
  .post(UserController.createUser);

export default router;
