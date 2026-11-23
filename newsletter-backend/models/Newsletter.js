import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Newsletter", newsletterSchema);
