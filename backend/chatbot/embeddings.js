import { pipeline } from "@huggingface/transformers";

let extractor;

const embed = async (input) => {
  extractor ??= pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  const run = await extractor;
  return (await run(input, { pooling: "mean", normalize: true })).tolist();
};

export default {
  embedDocuments: embed,
  embedQuery: async (q) => (await embed(q))[0],
};