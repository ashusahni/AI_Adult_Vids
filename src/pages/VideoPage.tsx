import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { videos } from '../data/content';
import { YouTubePlayer } from '../components/YouTubePlayer';
import { useAuth } from '../context/AuthContext';
import { ThumbsUp, ThumbsDown, Share2, MessageCircle, Flag, Clock, Eye } from 'lucide-react';

export const VideoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { authState } = useAuth();
  const { isAuthenticated, isSubscribed } = authState;
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const video = videos.find(v => v.id === id);

  if (!video) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-xl">Video not found</p>
      </div>
    );
  }

  if (video.premium && !isAuthenticated) {
    navigate('/signup');
    return null;
  }

  if (video.premium && !isSubscribed) {
    navigate('/subscribe');
    return null;
  }

  useEffect(() => {
    const liked = localStorage.getItem(`liked_${video.id}`);
    const disliked = localStorage.getItem(`disliked_${video.id}`);
    if (liked === 'true') {
      setLikes(prevLikes => prevLikes + 1);
    }
    if (disliked === 'true') {
      setDislikes(prevDislikes => prevDislikes + 1);
    }
  }, [video.id]);

  const handleLike = () => {
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

  return (
    <div className="min-h-screen bg-gray-900 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
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

              {/* Comments Section */}
              <div className="mt-6">
                <div className="flex items-center space-x-2 text-white mb-4">
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
          </div>

          {/* Recommended Videos */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-medium text-white mb-4">Recommended Videos</h2>
            <div className="space-y-4">
              {videos
                .filter(v => v.id !== video.id)
                .map(recommendedVideo => (
                  <div
                    key={recommendedVideo.id}
                    className="flex space-x-4 cursor-pointer hover:bg-gray-800/50 p-2 rounded-xl transition-colors"
                    onClick={() => navigate(`/video/${recommendedVideo.id}`)}
                  >
                    <div className="flex-shrink-0 w-52 relative">
                      <img
                        src={recommendedVideo.thumbnailUrl}
                        alt={recommendedVideo.title}
                        className="w-full aspect-video object-cover rounded-lg"
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