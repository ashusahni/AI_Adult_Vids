import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video as VideoIcon, Image as ImageIcon, Grid, Clock, TrendingUp } from 'lucide-react';
import { videos, images } from '../data/content';
import { VideoCard } from '../components/VideoCard';
import { ImageCard } from '../components/ImageCard';
import { useAuth } from '../context/AuthContext';
import { Content } from '../types';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { authState } = useAuth();
  const { isAuthenticated, isSubscribed } = authState;
  const [activeTab, setActiveTab] = useState<'all' | 'videos' | 'images'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleContentClick = (content: Content) => {
    if (!isAuthenticated) {
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
    <div>
      {/* Hero Section */}
      <div className="bg-black/95">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Create Beautiful</span>
              <span className="block text-purple-500">AI-Enhanced Content</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Transform your media with cutting-edge AI technology. Create stunning portraits, enhance features, and explore creative styles.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <a href="/subscribe" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200 md:py-4 md:text-lg md:px-10">
                  Get Started
                </a>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a href="/features" className="w-full flex items-center justify-center px-8 py-3 border border-purple-500 text-base font-medium rounded-md text-purple-500 hover:bg-purple-500 hover:text-white transition-colors duration-200 md:py-4 md:text-lg md:px-10">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="flex space-x-4 mb-4 sm:mb-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                activeTab === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Grid className="w-5 h-5 mr-2" />
              All Content
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                activeTab === 'videos'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <VideoIcon className="w-5 h-5 mr-2" />
              Videos
            </button>
            <button
              onClick={() => setActiveTab('images')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                activeTab === 'images'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <ImageIcon className="w-5 h-5 mr-2" />
              Images
            </button>
          </div>
          
          <div className="w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search content..."
              className="w-full sm:w-64 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Latest Videos Section */}
        {(activeTab === 'all' || activeTab === 'videos') && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Clock className="w-5 h-5 text-purple-500 mr-2" />
              <h2 className="text-2xl font-bold text-white">Latest Videos</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        {(activeTab === 'all' || activeTab === 'images') && (
          <div>
            <div className="flex items-center mb-6">
              <TrendingUp className="w-5 h-5 text-purple-500 mr-2" />
              <h2 className="text-2xl font-bold text-white">Featured Images</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        {activeTab !== 'all' && 
          ((activeTab === 'videos' && filteredContent.videos.length === 0) ||
           (activeTab === 'images' && filteredContent.images.length === 0)) && (
          <div className="text-center py-12">
            <p className="text-gray-400">No {activeTab} found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};