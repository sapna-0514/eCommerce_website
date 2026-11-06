import { readFile } from "node:fs/promises";
import { Document } from "@langchain/core/documents";

const files = ["faq", "shipping-policy", "return-policy", "payment-policy"];

export const loadDocuments = async () => {
  const documents = [];
  for (const name of files) {
    const text = await readFile(new URL(`../knowledge/${name}.txt`, import.meta.url), "utf8");
    documents.push(new Document({ pageContent: text, metadata: { source: name } }));
  }
  return documents;
};