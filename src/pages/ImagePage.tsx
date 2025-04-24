import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { images } from '../data/content';
import { useAuth } from '../context/AuthContext';
import { ThumbsUp, ThumbsDown, Share2, MessageCircle, Flag, Eye, Download, X } from 'lucide-react';
import { ImageCard } from '../components/ImageCard';
import { Image } from '../types';
import { FaCrown } from 'react-icons/fa';

export const ImagePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { authState } = useAuth();
  const { isAuthenticated, isSubscribed } = authState;
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [relatedImages, setRelatedImages] = useState<Image[]>([]);
  const [popularImages, setPopularImages] = useState<Image[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentImage = images.find(i => i.id === id);

  useEffect(() => {
    if (currentImage) {
      // Get related images (same category)
      const related = images
        .filter(img => 
          img.id !== currentImage.id && 
          img.category === currentImage.category
        )
        .slice(0, 16);

      // Get popular images (most viewed, excluding current and related)
      const popular = images
        .filter(img => 
          img.id !== currentImage.id && 
          !related.some(r => r.id === img.id)
        )
        .sort((a, b) => b.views - a.views)
        .slice(0, 12);

      setRelatedImages(related);
      setPopularImages(popular);
    }
  }, [id, currentImage]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFullscreen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isFullscreen && target.closest('.fullscreen-image') === null) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFullscreen]);

  if (!currentImage) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-xl">Image not found</p>
      </div>
    );
  }

  if (currentImage.premium && !isAuthenticated) {
    navigate('/signup');
    return null;
  }

  if (currentImage.premium && !isSubscribed) {
    navigate('/subscribe');
    return null;
  }

  return (
    <div 
      className="min-h-screen bg-gray-900 relative"
      style={{
        backgroundImage: "url('/images/content/IMG-20250422-WA0024.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Fullscreen Image View */}
        {isFullscreen && (
          <div className="fixed inset-0 z-50 bg-black flex items-center justify-center fullscreen-image">
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 text-white hover:text-purple-500 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={currentImage.imageUrl}
              alt={currentImage.title}
              className="max-w-full max-h-screen object-contain"
            />
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-[2000px] mx-auto relative">
          <div className="relative z-10">
            {/* Image Section */}
            <div className="relative group cursor-pointer" onClick={() => setIsFullscreen(true)}>
              <div className="aspect-[16/9] overflow-hidden bg-black/50">
                <img
                  src={currentImage.imageUrl}
                  alt={currentImage.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="bg-black/70 px-6 py-3 rounded-full text-white font-medium">
                  Click to view fullscreen
                </div>
              </div>

              {/* Premium Badge */}
              {currentImage.premium && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                  <FaCrown className="text-yellow-300" />
                  <span className="font-medium">Premium</span>
                </div>
              )}
            </div>

            {/* Info Bar */}
            <div className="bg-gray-800/50 border-y border-gray-700">
              <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <h1 className="text-xl font-bold text-white">{currentImage.title}</h1>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Eye className="w-5 h-5" />
                    <span>{currentImage.views.toLocaleString()} views</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-gray-300 hover:text-purple-500 transition-colors">
                    <ThumbsUp className="w-5 h-5" />
                    <span>{currentImage.likes.toLocaleString()}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-300 hover:text-purple-500 transition-colors">
                    <ThumbsDown className="w-5 h-5" />
                    <span>{currentImage.dislikes.toLocaleString()}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-300 hover:text-purple-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors">
                    <Download className="w-5 h-5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Details and Images Sections */}
            <div className="max-w-7xl mx-auto px-4 py-8">
              {/* Image Details */}
              <div className="mb-12">
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">
                    {currentImage.resolution}
                  </div>
                  <div className="text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-700">
                    {currentImage.category}
                  </div>
                </div>
                
                <div className="bg-gray-800/30 rounded-xl p-4">
                  <div className={`text-gray-300 ${!isDescriptionExpanded && 'line-clamp-2'}`}>
                    {currentImage.description}
                  </div>
                  {currentImage.description.length > 100 && (
                    <button
                      className="text-purple-500 hover:text-purple-400 mt-2 font-medium"
                      onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    >
                      {isDescriptionExpanded ? 'Show less' : 'Show more'}
                    </button>
                  )}
                </div>
              </div>

              {/* More Like This Section */}
              {relatedImages.length > 0 && (
                <div className="mb-16 bg-gray-800/20 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                      More like this
                    </h2>
                    <div className="h-[1px] flex-grow mx-6 bg-gradient-to-r from-purple-500/50 to-transparent" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6 transition-all duration-300">
                    {relatedImages.map(relatedImage => (
                      <ImageCard
                        key={relatedImage.id}
                        image={relatedImage}
                        onClick={() => navigate(`/image/${relatedImage.id}`)}
                        className="transform hover:scale-105 transition-transform duration-300"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* People Also Viewed Section */}
              {popularImages.length > 0 && (
                <div className="bg-gray-800/20 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                      People also viewed
                    </h2>
                    <div className="h-[1px] flex-grow mx-6 bg-gradient-to-r from-purple-500/50 to-transparent" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6 transition-all duration-300">
                    {popularImages.map(popularImage => (
                      <ImageCard
                        key={popularImage.id}
                        image={popularImage}
                        onClick={() => navigate(`/image/${popularImage.id}`)}
                        className="transform hover:scale-105 transition-transform duration-300"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePage; 