import { askChatbot } from "./chatbot/rag.js";
import { closeDb } from "./chatbot/store.js";

const questions = [
  "How many days do I have to return an item?",
  "What is your phone number?",
  "How much is the delivery fee?",
  "Do you have Cash on Delivery?",
  "Do you sell shoes?",
];

for (const q of questions) {
  console.log("\nQ:", q);
  console.log("A:", await askChatbot(q));
}
await closeDb();