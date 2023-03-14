import mongoose from "mongoose";

const animSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  media: {
    url: String,
    public_id: String,
    fileType: String,
  },
});

export default mongoose.model("animdb", animSchema);
