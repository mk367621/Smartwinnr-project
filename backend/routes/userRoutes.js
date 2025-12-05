import express from "express";
import { userModel } from "../models/userModel.js";
import userMiddleware from "../middlewares/userMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";

const userRoute = express.Router();
