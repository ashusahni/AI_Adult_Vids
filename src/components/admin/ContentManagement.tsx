import React, { useState, useEffect } from 'react';
import { addVideo, addImage, getVideos, getImages, deleteVideo, deleteImage } from '../../firebase/content';
import { Upload, Trash2 } from 'lucide-react';

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState<'videos' | 'images'>('videos');
  const [videos, setVideos] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    duration: '00:00',
    premium: false
  });
  const [newImage, setNewImage] = useState({
    title: '',
    description: '',
    premium: false
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    loadContent();
  }, [activeTab]);

  const loadContent = async () => {
    try {
      setLoading(true);
      setError(null);
      if (activeTab === 'videos') {
        const data = await getVideos();
        setVideos(data);
      } else {
        const data = await getImages();
        setImages(data);
      }
    } catch (error) {
      console.error('Error loading content:', error);
      setError('Failed to load content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVideoUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || !thumbnailFile) {
      alert('Please select both video and thumbnail files');
      return;
    }

    try {
      setUploadingVideo(true);
      await addVideo(videoFile, thumbnailFile, {
        ...newVideo,
        type: 'video'
      });
      setNewVideo({
        title: '',
        description: '',
        duration: '00:00',
        premium: false
      });
      setVideoFile(null);
      setThumbnailFile(null);
      loadContent();
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Failed to upload video. Please try again.');
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleImageUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert('Please select an image file');
      return;
    }

    try {
      setUploadingImage(true);
      await addImage(imageFile, {
        ...newImage,
        type: 'image'
      });
      setNewImage({
        title: '',
        description: '',
        premium: false
      });
      setImageFile(null);
      loadContent();
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDelete = async (id: string, type: 'video' | 'image') => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) {
      return;
    }

    try {
      if (type === 'video') {
        await deleteVideo(id);
      } else {
        await deleteImage(id);
      }
      loadContent();
    } catch (error) {
      console.error('Error deleting content:', error);
      alert(`Failed to delete ${type}. Please try again.`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={loadContent}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-400">Content Management</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'videos'
                ? 'bg-purple-900 text-purple-400'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Videos
          </button>
          <button
            onClick={() => setActiveTab('images')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'images'
                ? 'bg-purple-900 text-purple-400'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Images
          </button>
        </div>
      </div>

      {/* Upload Form */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-purple-400">
          Upload New {activeTab === 'videos' ? 'Video' : 'Image'}
        </h2>
        <form onSubmit={activeTab === 'videos' ? handleVideoUpload : handleImageUpload}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                value={activeTab === 'videos' ? newVideo.title : newImage.title}
                onChange={(e) =>
                  activeTab === 'videos'
                    ? setNewVideo({ ...newVideo, title: e.target.value })
                    : setNewImage({ ...newImage, title: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <input
                type="text"
                value={activeTab === 'videos' ? newVideo.description : newImage.description}
                onChange={(e) =>
                  activeTab === 'videos'
                    ? setNewVideo({ ...newVideo, description: e.target.value })
                    : setNewImage({ ...newImage, description: e.target.value })
                }
                className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          {activeTab === 'videos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Duration (MM:SS)
                </label>
                <input
                  type="text"
                  value={newVideo.duration}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, duration: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Premium Content
                </label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newVideo.premium}
                    onChange={(e) =>
                      setNewVideo({ ...newVideo, premium: e.target.checked })
                    }
                    className="w-4 h-4 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                  />
                  <span className="ml-2 text-gray-300">Premium</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'images' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Premium Content
              </label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={newImage.premium}
                  onChange={(e) =>
                    setNewImage({ ...newImage, premium: e.target.checked })
                  }
                  className="w-4 h-4 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                />
                <span className="ml-2 text-gray-300">Premium</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {activeTab === 'videos' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Video File
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => e.target.files && setVideoFile(e.target.files[0])}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Thumbnail
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && setThumbnailFile(e.target.files[0])}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Image File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files && setImageFile(e.target.files[0])}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={activeTab === 'videos' ? uploadingVideo : uploadingImage}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {activeTab === 'videos'
                ? uploadingVideo
                  ? 'Uploading Video...'
                  : 'Upload Video'
                : uploadingImage
                ? 'Uploading Image...'
                : 'Upload Image'}
              <Upload className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Content List */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-purple-400">
          {activeTab === 'videos' ? 'Videos' : 'Images'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeTab === 'videos' ? videos : images).length === 0 ? (
            <div className="col-span-full text-center text-gray-400 py-8">
              No {activeTab} uploaded yet
            </div>
          ) : (
            (activeTab === 'videos' ? videos : images).map((item) => (
              <div
                key={item.id}
                className="bg-gray-700 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative">
                  <img
                    src={activeTab === 'videos' ? item.thumbnail : item.url}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  {item.premium && (
                    <span className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded text-sm">
                      Premium
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-100 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">{item.description}</p>
                  {activeTab === 'videos' && (
                    <p className="text-gray-400 text-sm mb-4">
                      Duration: {item.duration}
                    </p>
                  )}
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleDelete(item.id, activeTab === 'videos' ? 'video' : 'image')}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentManagement; 