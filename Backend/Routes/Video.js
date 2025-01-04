import express from "express";
import Video from '../Functions/Video.js';
import Authorization from '../Middlewares/Authorization/Authorization.js';

let { AddVideo, upload, AllVideos, GetVideoById, AddComment, UpdateComment } = Video; 
let VideoRouter = express.Router();

VideoRouter.post('/addvideo', upload.single('video'), Authorization, AddVideo);
VideoRouter.get('/allvideos', AllVideos);
VideoRouter.get('/videos/:id', GetVideoById); 
VideoRouter.post("/videos/:id/comments", Authorization, AddComment);
VideoRouter.put('/videos/:id/comments', Authorization, UpdateComment);


export default VideoRouter;
