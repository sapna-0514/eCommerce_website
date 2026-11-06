import { getChunks } from "./splitter.js";
import { vectorStore, collection, closeDb } from "./store.js";

const chunks = await getChunks();
await collection.deleteMany({});
await vectorStore.addDocuments(chunks);

console.log("Saved chunks:", await collection.countDocuments());
await closeDb();