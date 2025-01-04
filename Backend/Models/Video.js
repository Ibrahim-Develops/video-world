import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    video: { type: String, required: true }, 
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Users" }, 
    Comments:[
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ]
  },
  { timestamps: true } 
);

const VideoModel = mongoose.model("Video", VideoSchema);

export default VideoModel;
