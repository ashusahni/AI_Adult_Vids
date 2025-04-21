import React from 'react';
import { Image } from '../types';
import { Heart, ThumbsDown, Lock } from 'lucide-react';

interface ImageCardProps {
  image: Image;
  onClick: () => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <div 
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-105"
      onClick={onClick}
    >
      <div className="relative">
        <img 
          src={image.thumbnailUrl} 
          alt={image.title}
          className="w-full h-48 object-cover"
        />
        {image.premium && (
          <div className="absolute top-2 right-2 bg-purple-500 rounded-full p-1">
            <Lock className="w-4 h-4 text-white" />
          </div>
        )}
        <div className="absolute bottom-2 right-2 bg-black/70 rounded px-2 py-1 text-xs text-white">
          {image.resolution}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
          {image.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Heart className="w-4 h-4 text-purple-500 mr-1" />
              {image.likes}
            </div>
            <div className="flex items-center">
              <ThumbsDown className="w-4 h-4 text-gray-500 mr-1" />
              {image.dislikes}
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="text-xs bg-gray-700 rounded px-2 py-1">
              {image.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}; 