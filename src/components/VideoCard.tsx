import React from 'react';
import { Video } from '../types';
import { Play, Plus, ThumbsUp } from 'lucide-react';

interface VideoCardProps {
  video: Video;
  onClick: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  return (
    <div 
      className="group relative cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-video overflow-hidden rounded-lg">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 flex items-center justify-center space-x-4">
            <button className="p-2 bg-purple-500/20 rounded-full text-white hover:bg-purple-500/30 transition-colors duration-200">
              <Play className="w-6 h-6" />
            </button>
            <button className="p-2 bg-purple-500/20 rounded-full text-white hover:bg-purple-500/30 transition-colors duration-200">
              <Plus className="w-6 h-6" />
            </button>
            <button className="p-2 bg-purple-500/20 rounded-full text-white hover:bg-purple-500/30 transition-colors duration-200">
              <ThumbsUp className="w-6 h-6" />
            </button>
          </div>
        </div>
        {video.premium && (
          <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded">
            Premium
          </div>
        )}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-white font-medium line-clamp-1 group-hover:text-purple-400 transition-colors duration-200">{video.title}</h3>
        <div className="flex items-center text-gray-400 text-sm mt-1">
          <span>{video.views.toLocaleString()} views</span>
          <span className="mx-1">•</span>
          <span>{video.likes.toLocaleString()} likes</span>
        </div>
      </div>
    </div>
  );
};