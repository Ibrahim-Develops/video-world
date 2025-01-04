import axios from 'axios';
import React, { useState } from 'react';

const AddVideo = () => {
  const [video, setVideo] = useState({
    title: "",
    description: "",
    video: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "video") {
      setVideo({ ...video, video: files[0] });
    } else {
      setVideo({ ...video, [name]: value });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    alert('done');
    try {
      const formData = new FormData();
      formData.append("title", video.title);
      formData.append("description", video.description);
      formData.append("video", video.video);

      const response = await axios.post("http://localhost:7001/addvideo", formData, { withCredentials: true });

      console.log(response.data); 
      
    } catch (error) {
      console.error("Error uploading video:", error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-xl mt-20 border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Upload Your Video</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">Video Title</label>
          <input
            onChange={handleChange}
            type="text"
            value={video.title}
            name="title"
            id="title"
            placeholder="Enter video title"
            className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="description" className="block text-lg font-medium text-gray-700">Video Description</label>
          <input
            onChange={handleChange}
            type="text"
            value={video.description}
            name="description"
            id="description"
            placeholder="Enter video description"
            className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="video" className="block text-lg font-medium text-gray-700">Select Video</label>
          <input
            onChange={handleChange}
            type="file"
            name="video"
            accept="video/*" 
            id="video"
            className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 ease-in-out"
        >
          Add Video
        </button>
      </form>
    </div>
  );
};

export default AddVideo;
