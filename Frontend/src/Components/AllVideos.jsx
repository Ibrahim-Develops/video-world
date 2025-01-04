import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:7001/allvideos');
        setVideos(response.data.videos);
      } catch (err) {
        console.error('Failed to fetch videos', err);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">All Uploaded Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {videos.map((video) => (
          <Link
            to={`/displayvideo/${video._id}`} // Pass video ID in the URL
            key={video._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative">
              <video controls className="w-full h-48 object-cover" src={video.video} />
            </div>
            <div className="flex items-center ms-2">
              <div className="p-3 flex justify-center items-center rounded-full border-[1px] border-black">
                {video.author?.name || 'Unknown Author'}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 truncate">{video.title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{video.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllVideos;
