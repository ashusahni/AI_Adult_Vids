import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Video as VideoIcon, Image as ImageIcon, Grid, Clock, TrendingUp, Search } from 'lucide-react';
import { videos, images } from '../data/content';
import { VideoCard } from '../components/VideoCard';
import { ImageCard } from '../components/ImageCard';
import { useAuth } from '../context/AuthContext';
import { Content } from '../types';
import bgImage from '../assets/images/IMG-20250422-WA0024.jpg';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { authState } = useAuth();
  const { isAuthenticated, isSubscribed } = authState;
  const [activeTab, setActiveTab] = useState<'all' | 'videos' | 'images'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [videoSort, setVideoSort] = useState<'latest' | 'trending'>('latest');

  const handleContentClick = (content: Content) => {
    if (content.premium && !isAuthenticated) {
      navigate('/signup');
      return;
    }
    
    if (content.premium && !isSubscribed) {
      navigate('/subscribe');
      return;
    }
    
    navigate(`/${content.type}/${content.id}`);
  };

  const filteredContent = {
    videos: videos.filter(video => 
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    images: images.filter(image => 
      image.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  };
  
  // Sort videos based on videoSort state
  const sortedVideos = [...filteredContent.videos].sort((a, b) => {
    if (videoSort === 'trending') {
      return b.views - a.views;
    } else {
      return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    }
  });

  // View all videos link handler
  const handleViewAllVideos = () => {
    navigate('/video');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 z-10"></div>
        <div 
          className="h-[60vh] bg-cover bg-center" 
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="absolute inset-0 flex items-center z-20">
          <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                <span className="block">Discover Premium</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                  AI-Generated Adult Content
                </span>
              </h1>
              <p className="mt-4 text-xl text-gray-300">
                Explore our extensive library of AI-generated adult content. Subscribe for unlimited access to premium videos and images.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link 
                  to="/signup" 
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10 transform transition duration-200 hover:scale-105"
                >
                  Get Started
                </Link>
                <Link 
                  to="/features" 
                  className="flex items-center justify-center px-8 py-3 border border-purple-500 text-base font-medium rounded-md text-purple-500 bg-transparent hover:bg-purple-500 hover:text-white md:py-4 md:text-lg md:px-10 transform transition duration-200 hover:scale-105"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'all'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 scale-105'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:scale-105'
              }`}
            >
              <Grid className="w-5 h-5 mr-2" />
              All Content
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'videos'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 scale-105'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:scale-105'
              }`}
            >
              <VideoIcon className="w-5 h-5 mr-2" />
              Videos
            </button>
            <button
              onClick={() => setActiveTab('images')}
              className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'images'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 scale-105'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:scale-105'
              }`}
            >
              <ImageIcon className="w-5 h-5 mr-2" />
              Images
            </button>
          </div>
          
          <div className="w-full sm:w-auto relative">
            <input
              type="text"
              placeholder="Search content..."
              className="w-full sm:w-80 px-6 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Latest Videos Section */}
        {(activeTab === 'all' || activeTab === 'videos') && sortedVideos.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <Clock className="w-6 h-6 text-purple-500 mr-3" />
                <h2 className="text-2xl font-bold text-white">Latest Videos</h2>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setVideoSort('latest')}
                  className={`px-3 py-1 rounded text-sm ${
                    videoSort === 'latest' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Latest
                </button>
                <button 
                  onClick={() => setVideoSort('trending')}
                  className={`px-3 py-1 rounded text-sm ${
                    videoSort === 'trending' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Trending
                </button>
                <button 
                  onClick={handleViewAllVideos}
                  className="text-purple-500 hover:text-purple-400 transition-colors duration-200 flex items-center ml-3"
                >
                  View All
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {sortedVideos.slice(0, 8).map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={() => handleContentClick(video)}
                />
              ))}
            </div>
            
            {/* Show More button for mobile */}
            {sortedVideos.length > 8 && activeTab === 'videos' && (
              <div className="mt-8 text-center">
                <button 
                  onClick={handleViewAllVideos}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all duration-200"
                >
                  Show More Videos
                </button>
              </div>
            )}
          </div>
        )}

        {/* Featured Images Section */}
        {(activeTab === 'all' || activeTab === 'images') && filteredContent.images.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <ImageIcon className="w-6 h-6 text-purple-500 mr-3" />
                <h2 className="text-2xl font-bold text-white">Featured Images</h2>
              </div>
              <Link
                to="/image"
                className="text-purple-500 hover:text-purple-400 transition-colors duration-200 flex items-center"
              >
                View All
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {filteredContent.images.slice(0, 8).map((image) => (
                <ImageCard
                  key={image.id}
                  image={image}
                  onClick={() => handleContentClick(image)}
                />
              ))}
            </div>
            
            {/* Show More button for mobile */}
            {filteredContent.images.length > 8 && activeTab === 'images' && (
              <div className="mt-8 text-center">
                <Link
                  to="/image"
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl inline-block transition-all duration-200"
                >
                  Show More Images
                </Link>
              </div>
            )}
          </div>
        )}

        {/* No Results */}
        {searchTerm && 
          ((activeTab === 'videos' && filteredContent.videos.length === 0) ||
           (activeTab === 'images' && filteredContent.images.length === 0) ||
           (activeTab === 'all' && filteredContent.videos.length === 0 && filteredContent.images.length === 0)) && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-gray-400 text-lg mb-2">No content found</p>
            <p className="text-gray-500">Try adjusting your search to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;