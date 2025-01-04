import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DisplayVideos = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);  // Ensure it's always an array
  const [editingComment, setEditingComment] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`http://localhost:7001/videos/${id}`);
        setVideo(response.data.video);
        setComments(response.data.video.Comments || []);  // Ensure fallback to empty array
      } catch (err) {
        setError("Failed to fetch video");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const response = await axios.post(`http://localhost:7001/videos/${id}/comments`, { comment }, { withCredentials: true });
      setComments(response.data.comments);
      setComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const handleEditClick = (commentId, currentText) => {
    setEditingComment(commentId);
    setEditedCommentText(currentText);
  };

  const handleUpdateComment = async (e) => {
    e.preventDefault();
    if (!editedCommentText.trim()) return;

    try {
        // Send the updated comment to the server
        const response = await axios.put(
            `http://localhost:7001/videos/${id}/comments`,
            { commentId: editingComment, newText: editedCommentText },
            { withCredentials: true }
        );

        // Update the comments locally without needing to re-fetch the video
        const updatedComments = comments.map((c) =>
            c._id === editingComment ? { ...c, text: editedCommentText } : c
        );

        setComments(updatedComments);  // Update the state with the modified comment
        setEditingComment(null);
        setEditedCommentText("");
    } catch (err) {
        console.error("Error updating comment:", err);
    }
};


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {video ? (
          <div>
            <video controls className="w-full h-96 object-cover" src={video.video}></video>
            <div className="p-4">
              <h1 className="text-2xl font-bold text-gray-800">{video.title}</h1>
              <p className="text-gray-600 mt-2">{video.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                <strong>Author:</strong> {video.author?.name || "Unknown"}
              </p>
            </div>

            <div className="p-4 border-t mt-4">
              <h2 className="text-lg font-bold text-gray-800">Comments</h2>
              <div className="mt-4">
                {comments && comments.length > 0 ? (  
                  comments.map((c) => (
                    <div key={c._id} className="p-2 border-b">
                      <p className="text-sm text-gray-700">{c.text}</p>
                      <span className="text-xs text-gray-500">
                        {c.user || "Anonymous"} - {new Date(c.createdAt).toLocaleString()}
                      </span>
                      {editingComment !== c._id && (
                        <button
                          onClick={() => handleEditClick(c._id, c.text)}
                          className="ml-2 text-blue-500"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No comments yet.</p>
                )}
              </div>
              {editingComment ? (
                <form onSubmit={handleUpdateComment} className="mt-4">
                  <textarea
                    value={editedCommentText}
                    onChange={(e) => setEditedCommentText(e.target.value)}
                    placeholder="Edit your comment..."
                    className="w-full p-2 border rounded-lg focus:outline-none"
                    rows="3"
                  ></textarea>
                  <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Update Comment
                  </button>
                </form>
              ) : (
                <form onSubmit={handleCommentSubmit} className="mt-4">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full p-2 border rounded-lg focus:outline-none"
                    rows="3"
                  ></textarea>
                  <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Add Comment
                  </button>
                </form>
              )}
            </div>
          </div>
        ) : (
          <p className="p-4 text-center text-gray-500">Video not found.</p>
        )}
      </div>
    </div>
  );
};

export default DisplayVideos;
