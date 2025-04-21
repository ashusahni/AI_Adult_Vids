import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sampleVideos } from '../data/sampleContent';
import { VideoCard } from '../components/VideoCard';
import { Play, Plus, ThumbsUp, Volume2, VolumeX, Maximize2 } from 'lucide-react';

export const VideoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const video = sampleVideos.find(v => v.id === id);
  const relatedVideos = sampleVideos.filter(v => v.id !== id);

  if (!video) {
    return <div className="text-white text-center py-20">Video not found</div>;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative h-[75vh] w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        
        {/* Video Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">{video.title}</h1>
            <p className="text-gray-300 mb-6 max-w-2xl">{video.description}</p>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-6 py-2 bg-white text-black rounded hover:bg-white/90">
                <Play className="w-5 h-5 mr-2" />
                Play
              </button>
              <button className="flex items-center px-4 py-2 bg-gray-600/50 text-white rounded hover:bg-gray-600/70">
                <Plus className="w-5 h-5 mr-2" />
                My List
              </button>
              <button className="flex items-center px-4 py-2 bg-gray-600/50 text-white rounded hover:bg-gray-600/70">
                <ThumbsUp className="w-5 h-5 mr-2" />
                Like
              </button>
            </div>
          </div>
        </div>

        {/* Top Controls */}
        <div className="absolute top-4 right-4 flex items-center space-x-4 z-20">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Video Details */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-green-500 font-semibold">98% Match</span>
              <span className="text-gray-400">{video.duration}</span>
              <span className="text-gray-400">HD</span>
            </div>
            <p className="text-gray-300 mb-4">{video.description}</p>
            <div className="flex items-center space-x-4 text-gray-400">
              <span>Category: {video.category}</span>
              <span>Views: {video.views.toLocaleString()}</span>
              <span>Likes: {video.likes.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Related Videos */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">More Like This</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedVideos.map((relatedVideo) => (
              <VideoCard
                key={relatedVideo.id}
                video={relatedVideo}
                onClick={() => navigate(`/video/${relatedVideo.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};