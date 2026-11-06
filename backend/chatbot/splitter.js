import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { loadDocuments } from "./loader.js";

export const getChunks = async () => {
  const documents = await loadDocuments();
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });
  return splitter.splitDocuments(documents);
};