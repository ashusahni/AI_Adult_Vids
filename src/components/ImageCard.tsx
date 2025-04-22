import React, { useState } from 'react';
import { Image } from '../types';
import { FaHeart, FaThumbsDown, FaEye, FaCrown, FaDownload } from 'react-icons/fa';

interface ImageCardProps {
  image: Image;
  onClick: () => void;
  className?: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image, onClick, className = '' }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div 
      className={`group relative cursor-pointer bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative">
        <img
          src={image.thumbnailUrl}
          alt={image.title}
          className={`w-full object-cover transition-transform duration-500 ${
            isHovering ? 'scale-110 blur-sm' : 'scale-100'
          }`}
        />
        
        {/* Overlay on Hover */}
        <div className={`absolute inset-0 bg-black/60 flex flex-col justify-between p-4 transition-opacity duration-300 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white line-clamp-2">
              {image.title}
            </h3>
            <p className="text-sm text-gray-300 line-clamp-2">
              {image.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-3 text-sm text-gray-300">
              <div className="flex items-center">
                <FaHeart className="text-red-500 mr-1" />
                <span>{image.likes.toLocaleString()}</span>
              </div>
              <div className="flex items-center">
                <FaEye className="text-purple-400 mr-1" />
                <span>{image.views.toLocaleString()}</span>
              </div>
            </div>
            <FaDownload className="text-white hover:text-purple-400 transition-colors" />
          </div>
        </div>

        {/* Premium Badge */}
        {image.premium && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
            <FaCrown className="text-yellow-300" />
            <span className="text-sm font-medium">Premium</span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute bottom-3 left-3 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {image.category}
        </div>

        {/* Resolution Badge */}
        <div className="absolute bottom-3 right-3 bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full text-xs font-medium">
          {image.resolution}
        </div>
      </div>
    </div>
  );
}; 