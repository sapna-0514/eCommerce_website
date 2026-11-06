import express from "express";
import rateLimit from "express-rate-limit";
import { chat } from "../controllers/chatbotControllers.js";

const chatbotRouter = express.Router();

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "You are sending messages too fast. Please wait a minute and try again." },
});

chatbotRouter.post("/ask", chatLimiter, chat);

export default chatbotRouter;