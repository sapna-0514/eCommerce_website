import { vectorStore } from "./store.js";
import llm from "./llm.js";

const retriever = vectorStore.asRetriever({ k: 4 });

export const askChatbot = async (question) => {
  const docs = await retriever.invoke(question);
  const context = docs.map((d) => d.pageContent).join("\n\n");

  const prompt = `You are a helpful customer support assistant for an online clothing store called Forever.
Answer using only the context below. If the answer is not in the context, say you don't have enough information and suggest contacting support at admin@forever.com.

Context:
${context}

Question: ${question}
Answer:`;

  const res = await llm.invoke(prompt);
  return res.content;
};