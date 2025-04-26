import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { videos } from '../data/content';
import { YouTubePlayer } from '../components/YouTubePlayer';
import { VideoCard } from '../components/VideoCard';
import { useAuth } from '../context/AuthContext';
import { ThumbsUp, ThumbsDown, Share2, Flag, Clock, Eye, Grid, TrendingUp } from 'lucide-react';

export const VideoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { authState } = useAuth();
  const { isAuthenticated, isSubscribed } = authState;
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [activeTab, setActiveTab] = useState<'all' | 'trending' | 'latest'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const video = videos.find(v => v.id === id);
  
  const filteredVideos = videos.filter(video => 
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort videos based on active tab
  const sortedVideos = [...filteredVideos].sort((a, b) => {
    if (activeTab === 'trending') {
      return b.views - a.views;
    } else if (activeTab === 'latest') {
      return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    }
    return 0;
  });

  const handleContentClick = (videoId: string) => {
    const selectedVideo = videos.find(v => v.id === videoId);
    
    if (!selectedVideo) return;
    
    if (selectedVideo.premium && !isAuthenticated) {
      navigate('/signup');
      return;
    }
    
    if (selectedVideo.premium && !isSubscribed) {
      navigate('/subscribe');
      return;
    }
    
    navigate(`/video/${videoId}`);
  };

  if (!video && id) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-xl">Video not found</p>
      </div>
    );
  }

  // If no specific video is selected, show the video gallery
  if (!id) {
    return (
      <div className="min-h-screen bg-gray-900">
        <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-white mb-8">Video Library</h1>
          
          {/* Filtering and Sorting Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6 w-full">
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
                All Videos
              </button>
              <button
                onClick={() => setActiveTab('trending')}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === 'trending'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 scale-105'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:scale-105'
                }`}
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Trending
              </button>
              <button
                onClick={() => setActiveTab('latest')}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === 'latest'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 scale-105'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:scale-105'
                }`}
              >
                <Clock className="w-5 h-5 mr-2" />
                Latest
              </button>
            </div>
            
            <div className="w-full sm:w-auto relative">
              <input
                type="text"
                placeholder="Search videos..."
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
          
          {/* Video Grid */}
          {sortedVideos.length > 0 ? (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {sortedVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={() => handleContentClick(video.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-gray-400 text-lg mb-2">No videos found</p>
              <p className="text-gray-500">Try adjusting your search to find what you're looking for.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // At this point, we know video exists and id exists
  if (!video) {
    return null; // This should never happen, but TypeScript needs this check
  }

  // If premium video and not authenticated/subscribed, redirect
  if (video.premium && !isAuthenticated) {
    navigate('/signup');
    return null;
  }

  if (video.premium && !isSubscribed) {
    navigate('/subscribe');
    return null;
  }

  useEffect(() => {
    if (!video) return;
    
    const liked = localStorage.getItem(`liked_${video.id}`);
    const disliked = localStorage.getItem(`disliked_${video.id}`);
    if (liked === 'true') {
      setLikes(prevLikes => prevLikes + 1);
    }
    if (disliked === 'true') {
      setDislikes(prevDislikes => prevDislikes + 1);
    }
  }, [video?.id]);

  const handleLike = () => {
    if (!video) return;
    
    const liked = localStorage.getItem(`liked_${video.id}`);
    const disliked = localStorage.getItem(`disliked_${video.id}`);
    if (!liked) {
      setLikes(prevLikes => prevLikes + 1);
      localStorage.setItem(`liked_${video.id}`, 'true');
      // If previously disliked, remove the dislike
      if (disliked) {
        setDislikes(prevDislikes => prevDislikes - 1);
        localStorage.removeItem(`disliked_${video.id}`);
      }
      // TODO: Add API call to update likes on the server
    }
  };

  const handleDislike = () => {
    if (!video) return;
    
    const disliked = localStorage.getItem(`disliked_${video.id}`);
    const liked = localStorage.getItem(`liked_${video.id}`);
    if (!disliked) {
      setDislikes(prevDislikes => prevDislikes + 1);
      localStorage.setItem(`disliked_${video.id}`, 'true');
      // If previously liked, remove the like
      if (liked) {
        setLikes(prevLikes => prevLikes - 1);
        localStorage.removeItem(`liked_${video.id}`);
      }
      // TODO: Add API call to update dislikes on the server
    }
  };

  const handleShare = () => {
    const videoUrl = window.location.href;
    navigator.clipboard.writeText(videoUrl).then(() => {
      alert('Video URL copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  // Get videos with the same category for the "More like this" section
  const relatedVideos = videos
    .filter(v => v.id !== video.id && v.category === video.category)
    .slice(0, 8);

  // Get trending videos for recommended section
  const trendingVideos = [...videos]
    .filter(v => v.id !== video.id)
    .sort((a, b) => b.views - a.views)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-900 py-6">
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-9">
            {/* Video Player */}
            <div className="rounded-xl overflow-hidden">
              <YouTubePlayer videoId={video.youtubeId} title={video.title} />
            </div>

            {/* Video Info */}
            <div className="mt-4">
              <h1 className="text-2xl font-bold text-white mb-2">{video.title}</h1>
              
              <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-gray-700">
                <div className="flex items-center space-x-4 text-gray-400">
                  <div className="flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    <span>{video.views.toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>{video.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button onClick={handleLike} className="flex items-center space-x-2 text-gray-400 hover:text-purple-500 transition-colors">
                    <ThumbsUp className="w-5 h-5" />
                    <span>{likes.toLocaleString()}</span>
                  </button>
                  <button onClick={handleDislike} className="flex items-center space-x-2 text-gray-400 hover:text-purple-500 transition-colors">
                    <ThumbsDown className="w-5 h-5" />
                    <span>{dislikes.toLocaleString()}</span>
                  </button>
                  <button onClick={handleShare} className="flex items-center space-x-2 text-gray-400 hover:text-purple-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-400 hover:text-purple-500 transition-colors">
                    <Flag className="w-5 h-5" />
                    <span>Report</span>
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="mt-4 bg-gray-800/50 rounded-xl p-4">
                <div className={`text-gray-300 ${!isDescriptionExpanded && 'line-clamp-3'}`}>
                  {video.description}
                </div>
                <button
                  className="text-purple-500 hover:text-purple-400 mt-2 font-medium"
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                >
                  {isDescriptionExpanded ? 'Show less' : 'Show more'}
                </button>
              </div>

              {/* More Like This - Grid Layout */}
              <div className="mt-8">
                <h2 className="text-xl font-bold text-white mb-4">More Like This</h2>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {relatedVideos.map(relatedVideo => (
                    <VideoCard
                      key={relatedVideo.id}
                      video={relatedVideo}
                      onClick={() => handleContentClick(relatedVideo.id)}
                    />
                  ))}
                </div>
                
                {relatedVideos.length === 0 && (
                  <div className="bg-gray-800/50 rounded-xl p-6 text-center">
                    <p className="text-gray-400">No related videos found</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recommended Videos */}
          <div className="lg:col-span-3">
            <h2 className="text-lg font-medium text-white mb-4">Recommended Videos</h2>
            <div className="space-y-4">
              {trendingVideos.map(recommendedVideo => (
                <div
                  key={recommendedVideo.id}
                  className="flex space-x-4 cursor-pointer hover:bg-gray-800/50 p-2 rounded-xl transition-colors"
                  onClick={() => navigate(`/video/${recommendedVideo.id}`)}
                >
                  <div className="flex-shrink-0 w-32 h-20 relative">
                    <img
                      src={recommendedVideo.thumbnailUrl}
                      alt={recommendedVideo.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                      {recommendedVideo.duration}
                    </div>
                    {recommendedVideo.premium && (
                      <div className="absolute top-1 right-1 bg-purple-500 text-white text-xs px-1.5 py-0.5 rounded">
                        PREMIUM
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium line-clamp-2 text-sm">
                      {recommendedVideo.title}
                    </h3>
                    <div className="flex items-center text-gray-400 text-xs mt-1 space-x-2">
                      <span>{recommendedVideo.views.toLocaleString()} views</span>
                      <span>•</span>
                      <div className="flex items-center">
                        <ThumbsUp className="w-3 h-3 mr-1" />
                        {recommendedVideo.likes.toLocaleString()}
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

export default VideoPage;