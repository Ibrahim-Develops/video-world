import VideoModel from "../Models/Video.js";
import multer from 'multer'
import pkg from 'cloudinary';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import env from 'dotenv'

env.config()
const {v2: cloudinary} = pkg;


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Videos', 
      resource_type: 'video',
    },
});
const upload = multer({ storage });
  

let AddVideo = async (req, res) => {   
  try {
    const { title, description } = req.body;
    const videoUrl = req.file.path;

    const newVideo = await VideoModel.create({
      title,
      description,
      video: videoUrl,
      author: req.user._id,
    });

    await newVideo.save();

    res.status(201).json({ message: "Video uploaded successfully", video: newVideo });
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({ message: "Failed to upload video", error: error.message });
  }
}

let AllVideos = async (req, res) => {
  try {
    const videos = await VideoModel.find()
    res.status(200).json({ videos });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Failed to fetch videos", error: error.message });
  }
}

let GetVideoById = async (req, res) => {
  try {
    const video = await VideoModel.findById(req.params.id).populate('author')
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json({ video });
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).json({ message: "Failed to fetch video", error: error.message });
  }
};

let AddComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const video = await VideoModel.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    video.Comments.push({ user: req.user._id, text: comment }); 
    await video.save();

    res.status(201).json({ message: "Comment added successfully", comments: video.Comments });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Failed to add comment", error: error.message });
  }
};

let UpdateComment = async (req, res) => {
  try {
    const { commentId, newText } = req.body;

    if (!newText) {
      return res.status(400).json({ message: "Comment text cannot be empty" });
    }

    const video = await VideoModel.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const comment = video.Comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only update your own comments" });
    }

    comment.text = newText; 
    comment.updatedAt = new Date(); 

    await video.save();

    res.status(200).json({ message: "Comment updated successfully", comment });
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ message: "Failed to update comment", error: error.message });
  }
};



export default {AddVideo, upload, AllVideos, GetVideoById, AddComment, UpdateComment}