import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import { userModel } from "../models/userModel.js";
export default async function userMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        message: "No token available in headers...",
      });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        message: "User not found.",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Authentication error : ", error);
    return res.status(400).json({
      message: "Authentication failed at userMiddleware due to : ",
      error,
    });
  }
}
