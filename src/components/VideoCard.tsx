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
      className="group relative cursor-pointer bg-gray-900 rounded-lg overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="aspect-video relative">
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
        
        <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="p-3 bg-purple-500/80 rounded-full text-white hover:bg-purple-500 transition-colors duration-200">
              <Play className="w-6 h-6" fill="currentColor" />
            </button>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-2 right-2 flex space-x-2">
          {video.premium && (
            <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded font-medium">
              PREMIUM
            </div>
          )}
        </div>
        
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          {video.duration}
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-white font-medium line-clamp-2 group-hover:text-purple-400 transition-colors duration-200">
          {video.title}
        </h3>
        <div className="flex items-center text-gray-400 text-sm mt-2">
          <span>{video.views.toLocaleString()} views</span>
          <span className="mx-2">•</span>
          <div className="flex items-center">
            <ThumbsUp className="w-4 h-4 mr-1" />
            {video.likes.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};