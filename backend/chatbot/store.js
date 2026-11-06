import "dotenv/config";

import mongoose from "mongoose";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import embeddings from "./embeddings.js";


const conn = await mongoose
  .createConnection(process.env.MONGODB_URL, { dbName: "e-commerce" })
  .asPromise();

export const collection = conn.db.collection("chatbot_knowledge");

export const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
  collection,
  indexName: "vector_index",
  textKey: "text",
  embeddingKey: "embedding",
});

export const closeDb = () => conn.close();