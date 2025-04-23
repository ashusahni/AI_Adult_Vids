import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Video as VideoIcon, Image as ImageIcon, Grid, Clock, TrendingUp } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-black/20 min-h-[600px] flex items-center">
        {/* Background Image */}
        <img
          src={bgImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 backdrop-blur-[1px]"></div>
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-extrabold text-white sm:text-6xl md:text-7xl tracking-tight">
                <span className="block mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/90">Beautiful Porn</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">AI-Enhanced Contents</span>
              </h1>
              <p className="mt-8 text-lg sm:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
                Transform your media with cutting-edge AI technology. Create stunning portraits, enhance features, and explore creative styles.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <Link 
                  to="/signup" 
                  className="w-full sm:w-auto px-8 py-4 text-base font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                >
                  Get Started
                </Link>
                <Link 
                  to="/how-it-works" 
                  className="w-full sm:w-auto px-8 py-4 text-base font-medium rounded-lg text-purple-400 border-2 border-purple-500/50 hover:bg-purple-500 hover:text-white transition-all duration-200 transform hover:scale-105"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Latest Videos Section */}
        {(activeTab === 'all' || activeTab === 'videos') && filteredContent.videos.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <Clock className="w-6 h-6 text-purple-500 mr-3" />
                <h2 className="text-2xl font-bold text-white">Latest Videos</h2>
              </div>
              <Link to="/videos" className="text-purple-500 hover:text-purple-400 transition-colors duration-200 flex items-center">
                View All
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredContent.videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={() => handleContentClick(video)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Featured Images Section */}
        {(activeTab === 'all' || activeTab === 'images') && filteredContent.images.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <TrendingUp className="w-6 h-6 text-purple-500 mr-3" />
                <h2 className="text-2xl font-bold text-white">Featured Images</h2>
              </div>
              <Link to="/images" className="text-purple-500 hover:text-purple-400 transition-colors duration-200 flex items-center">
                View All
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredContent.images.map((image) => (
                <ImageCard
                  key={image.id}
                  image={image}
                  onClick={() => handleContentClick(image)}
                />
              ))}
            </div>
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