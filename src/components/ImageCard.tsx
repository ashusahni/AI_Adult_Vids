import React, { useState } from 'react';
import { Image } from '../types';
import { FaHeart, FaThumbsDown, FaEye, FaCrown } from 'react-icons/fa';

interface ImageCardProps {
  image: Image;
  onClick: () => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div 
      className="group relative cursor-pointer bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
    >
      <div className="relative aspect-square">
        <img
          src={image.thumbnailUrl}
          alt={image.title}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isHovering ? 'scale-110' : 'scale-100'
          }`}
        />
        {image.premium && (
          <div className="absolute top-2 right-2 bg-purple-500 text-white px-2 py-1 rounded-full flex items-center gap-1">
            <FaCrown className="text-yellow-400" />
            <span className="text-sm">Premium</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-white text-lg font-medium">Click to view</div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1">
          {image.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {image.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <FaHeart className="text-red-500" />
              <span>{image.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaThumbsDown className="text-gray-500" />
              <span>{image.dislikes}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaEye className="text-gray-500" />
              <span>{image.views}</span>
            </div>
          </div>
          <span className="text-purple-400">{image.category}</span>
        </div>
      </div>
    </div>
  );
}; 