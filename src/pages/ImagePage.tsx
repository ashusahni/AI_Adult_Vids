import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { images } from '../data/content';
import { useAuth } from '../context/AuthContext';
import { ThumbsUp, ThumbsDown, Share2, MessageCircle, Flag, Eye } from 'lucide-react';

export const ImagePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { authState } = useAuth();
  const { isAuthenticated, isSubscribed } = authState;
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const image = images.find(i => i.id === id);

  if (!image) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-xl">Image not found</p>
      </div>
    );
  }

  if (image.premium && !isAuthenticated) {
    navigate('/signup');
    return null;
  }

  if (image.premium && !isSubscribed) {
    navigate('/subscribe');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0B0F17]">
      {/* Main Image Section */}
      <div className="w-full bg-gray-900/50">
        <div className="max-w-[1920px] mx-auto">
          <img
            src={image.imageUrl}
            alt={image.title}
            className="w-full h-auto max-h-[85vh] object-contain mx-auto"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold text-white mb-4">{image.title}</h1>

            {/* Stats Bar */}
            <div className="flex items-center space-x-6 text-gray-400 mb-6">
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>{image.views.toLocaleString()} views</span>
              </div>
              <div className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded text-sm">
                4K (3840x2160)
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-6 mb-8">
              <button className="flex items-center space-x-2 text-gray-400 hover:text-purple-500 transition-colors">
                <ThumbsUp className="w-6 h-6" />
                <span className="text-lg">{image.likes.toLocaleString()}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-purple-500 transition-colors">
                <ThumbsDown className="w-6 h-6" />
                <span className="text-lg">{image.dislikes.toLocaleString()}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-purple-500 transition-colors">
                <Share2 className="w-6 h-6" />
                <span className="text-lg">Share</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-purple-500 transition-colors">
                <Flag className="w-6 h-6" />
                <span className="text-lg">Report</span>
              </button>
            </div>

            {/* Description */}
            <div className="bg-gray-800/30 rounded-xl p-4 mb-8">
              <div className={`text-gray-300 ${!isDescriptionExpanded && 'line-clamp-3'}`}>
                {image.description}
              </div>
              <button
                className="text-purple-500 hover:text-purple-400 mt-2 font-medium"
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              >
                {isDescriptionExpanded ? 'Show less' : 'Show more'}
              </button>
            </div>

            {/* Comments Section */}
            <div className="mt-8">
              <div className="flex items-center space-x-2 text-white mb-6">
                <MessageCircle className="w-5 h-5" />
                <h2 className="text-lg font-medium">Comments</h2>
              </div>
              <div className="flex space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-700"></div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="w-full bg-transparent border-b border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 pb-2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Images */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-medium text-white mb-4">Recommended Images</h2>
            <div className="space-y-4">
              {images
                .filter(i => i.id !== image.id)
                .map(recommendedImage => (
                  <div
                    key={recommendedImage.id}
                    className="flex space-x-4 cursor-pointer hover:bg-gray-800/30 p-2 rounded-xl transition-colors"
                    onClick={() => navigate(`/image/${recommendedImage.id}`)}
                  >
                    <div className="flex-shrink-0 w-40 relative">
                      <img
                        src={recommendedImage.thumbnailUrl}
                        alt={recommendedImage.title}
                        className="w-full aspect-video object-cover rounded-lg"
                      />
                      {recommendedImage.premium && (
                        <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
                          PREMIUM
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium line-clamp-2 text-sm">
                        {recommendedImage.title}
                      </h3>
                      <div className="flex items-center text-gray-400 text-xs mt-1 space-x-2">
                        <span>{recommendedImage.views.toLocaleString()} views</span>
                        <span>•</span>
                        <div className="flex items-center">
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          {recommendedImage.likes.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 