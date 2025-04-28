import React, { useState, useRef, useEffect } from 'react';
import { Video } from '../types';
import { Play, Plus, ThumbsUp, Clock } from 'lucide-react';

interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  const [isHovering, setIsHovering] = useState(false);
  const previewTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    previewTimeoutRef.current = setTimeout(() => {
      setIsHovering(true);
    }, 500); // Start preview after 500ms hover
  };

  const handleMouseLeave = () => {
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current);
    }
    setIsHovering(false);
  };

  useEffect(() => {
    return () => {
      if (previewTimeoutRef.current) {
        clearTimeout(previewTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="group relative cursor-pointer rounded-2xl overflow-hidden border-2 border-transparent hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20 bg-gradient-to-br from-gray-900 to-gray-800"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="aspect-video relative rounded-t-xl overflow-hidden">
        {isHovering ? (
          <iframe
            className="w-full h-full absolute inset-0 pointer-events-none"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&start=10`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
        )}
        
        <div className={`absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="p-3 bg-purple-500 rounded-full text-white hover:bg-purple-600 transition-colors duration-200 transform hover:scale-110">
              <Play className="w-6 h-6" fill="currentColor" />
            </button>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex space-x-2">
          {video.premium && (
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
              PREMIUM
            </div>
          )}
        </div>
        
        <div className="absolute bottom-2 right-2 backdrop-blur-md bg-black/30 text-white text-xs px-3 py-1 rounded-full flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          {video.duration}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold line-clamp-2 group-hover:text-purple-400 transition-colors duration-200">
          {video.title}
        </h3>
        <div className="flex items-center text-gray-400 text-sm mt-3 mb-1">
          <div className="flex items-center mr-3">
            <ThumbsUp className="w-4 h-4 text-purple-500 mr-1" />
            {video.likes.toLocaleString()}
          </div>
          <span className="px-2 py-0.5 bg-gray-800 rounded-full text-xs">
            {video.views.toLocaleString()} views
          </span>
        </div>
        <div className="h-1 w-full bg-gray-800 mt-3 overflow-hidden rounded-full">
          <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${Math.min(video.likes / 1000, 100)}%` }}></div>
        </div>
      </div>
    </div>
  );
};