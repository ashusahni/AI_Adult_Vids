import React from 'react';
import { Image, Video } from '../types';
import { FaHeart, FaThumbsDown, FaEye, FaCrown } from 'react-icons/fa';

interface ContentCardProps {
  content: Image | Video;
  type: 'image' | 'video';
}

const ContentCard: React.FC<ContentCardProps> = ({ content, type }) => {
  const isVideo = type === 'video';
  const video = content as Video;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={content.thumbnailUrl}
          alt={content.title}
          className="w-full h-48 object-cover"
        />
        {content.premium && (
          <div className="absolute top-2 right-2 bg-purple-500 text-white px-2 py-1 rounded-full flex items-center gap-1">
            <FaCrown className="text-yellow-400" />
            <span className="text-sm">Premium</span>
          </div>
        )}
        {isVideo && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
            {video.duration}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
          {content.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {content.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FaHeart className="text-red-500" />
              <span>{content.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaThumbsDown className="text-gray-500" />
              <span>{content.dislikes}</span>
            </div>
            {isVideo && (
              <div className="flex items-center gap-1">
                <FaEye className="text-gray-500" />
                <span>{video.views}</span>
              </div>
            )}
          </div>
          <span className="text-purple-400">{content.category}</span>
        </div>
      </div>
    </div>
  );
};

export default ContentCard; 