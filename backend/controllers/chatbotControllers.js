import { askChatbot } from "../chatbot/rag.js";

export const chat = async (req, res) => {
  try {
    const message = String(req.body.message || "").trim();

    if (!message) {
      return res.json({ success: false, message: "Please type a message." });
    }
    if (message.length > 1000) {
      return res.json({ success: false, message: "Message is too long (max 1000 letters)." });
    }

    const reply = await askChatbot(message);
    res.json({ success: true, reply });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Sorry, I could not answer now. Please try again or contact admin@forever.com.",
    });
  }
};