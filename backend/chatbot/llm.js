import "dotenv/config";
import { ChatGroq } from "@langchain/groq";

export default new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0.2,
  maxTokens: 600,
  maxRetries: 2,
});