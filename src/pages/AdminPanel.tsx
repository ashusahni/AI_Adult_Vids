import React, { useState, useEffect } from 'react';
import { Plus, Save, Trash2, Upload } from 'lucide-react';
import { addVideo, addImage, getVideos, getImages, deleteVideo, deleteImage } from '../firebase/content';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'videos' | 'images'>('videos');
  const [videos, setVideos] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    duration: '00:00',
    premium: false,
    thumbnail: '',
    type: 'video' as const
  });
  const [newImage, setNewImage] = useState({
    title: '',
    description: '',
    premium: false,
    url: '',
    type: 'image' as const
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoUploading, setVideoUploading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load content data
  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      try {
        if (process.env.NODE_ENV === 'development') {
          // In development mode, use mock data
          const mockVideos = [
            {
              id: '1',
              title: 'Sample Video 1',
              description: 'This is a sample video for development',
              thumbnail: 'https://via.placeholder.com/640x360.png?text=Sample+Video+1',
              url: 'https://example.com/sample1.mp4',
              duration: '02:30',
              views: 123,
              premium: false,
              type: 'video',
              uploadDate: new Date().toISOString()
            },
            {
              id: '2',
              title: 'Premium Video Sample',
              description: 'This is a premium video sample for development',
              thumbnail: 'https://via.placeholder.com/640x360.png?text=Premium+Video',
              url: 'https://example.com/premium.mp4',
              duration: '05:10',
              views: 456,
              premium: true,
              type: 'video',
              uploadDate: new Date().toISOString()
            }
          ];
          
          const mockImages = [
            {
              id: '1',
              title: 'Sample Image 1',
              description: 'This is a sample image for development',
              url: 'https://via.placeholder.com/800x600.png?text=Sample+Image+1',
              premium: false,
              type: 'image',
              uploadDate: new Date().toISOString()
            },
            {
              id: '2',
              title: 'Premium Image Sample',
              description: 'This is a premium image sample for development',
              url: 'https://via.placeholder.com/800x600.png?text=Premium+Image',
              premium: true,
              type: 'image',
              uploadDate: new Date().toISOString()
            }
          ];
          
          setVideos(mockVideos);
          setImages(mockImages);
          setIsLoading(false);
          return;
        }
        
        // For production, load data from Firebase
        const videosData = await getVideos();
        const imagesData = await getImages();
        setVideos(videosData);
        setImages(imagesData);
      } catch (error) {
        console.error('Error loading content:', error);
        
        // Fallback to empty arrays
        setVideos([]);
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewVideo({
      ...newVideo,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewImage({
      ...newImage,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleThumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setThumbnailFile(e.target.files[0]);
      
      // Show thumbnail preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setNewVideo({
            ...newVideo,
            thumbnail: event.target.result as string
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
      
      // Show image preview
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setNewImage({
            ...newImage,
            url: event.target.result as string
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || !thumbnailFile) {
      alert('Please upload both a video file and thumbnail');
      return;
    }

    setVideoUploading(true);
    
    try {
      if (process.env.NODE_ENV === 'development') {
        // In development mode, simulate adding a video
        const newId = (videos.length + 1).toString();
        const mockVideoData = {
          id: newId,
          title: newVideo.title,
          description: newVideo.description,
          thumbnail: newVideo.thumbnail || 'https://via.placeholder.com/640x360.png?text=' + encodeURIComponent(newVideo.title),
          url: URL.createObjectURL(videoFile), // Create local URL for preview in dev
          duration: newVideo.duration,
          views: 0,
          premium: newVideo.premium,
          type: 'video',
          uploadDate: new Date().toISOString()
        };
        
        // Add to videos array
        setVideos([mockVideoData, ...videos]);
        
        // Reset form
        setNewVideo({
          title: '',
          description: '',
          duration: '00:00',
          premium: false,
          thumbnail: '',
          type: 'video'
        });
        setVideoFile(null);
        setThumbnailFile(null);
        
        alert('Video uploaded successfully! (Development Mode)');
        setVideoUploading(false);
        return;
      }
      
      // For production, upload to Firebase
      const newVideoData = await addVideo(
        videoFile,
        thumbnailFile,
        newVideo
      );
      
      // Update local state
      setVideos([newVideoData, ...videos]);
      
      // Reset form
      setNewVideo({
        title: '',
        description: '',
        duration: '00:00',
        premium: false,
        thumbnail: '',
        type: 'video'
      });
      setVideoFile(null);
      setThumbnailFile(null);
      
      alert('Video uploaded successfully!');
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Error uploading video. Please try again.');
    } finally {
      setVideoUploading(false);
    }
  };

  const handleImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert('Please upload an image file');
      return;
    }

    setImageUploading(true);
    
    try {
      if (process.env.NODE_ENV === 'development') {
        // In development mode, simulate adding an image
        const newId = (images.length + 1).toString();
        const mockImageData = {
          id: newId,
          title: newImage.title,
          description: newImage.description,
          url: newImage.url || URL.createObjectURL(imageFile), // Create local URL for preview in dev
          premium: newImage.premium,
          type: 'image',
          uploadDate: new Date().toISOString()
        };
        
        // Add to images array
        setImages([mockImageData, ...images]);
        
        // Reset form
        setNewImage({
          title: '',
          description: '',
          premium: false,
          url: '',
          type: 'image'
        });
        setImageFile(null);
        
        alert('Image uploaded successfully! (Development Mode)');
        setImageUploading(false);
        return;
      }
      
      // For production, upload to Firebase
      const newImageData = await addImage(
        imageFile,
        newImage
      );
      
      // Update local state
      setImages([newImageData, ...images]);
      
      // Reset form
      setNewImage({
        title: '',
        description: '',
        premium: false,
        url: '',
        type: 'image'
      });
      setImageFile(null);
      
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setImageUploading(false);
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        if (process.env.NODE_ENV === 'development') {
          // In development mode, just remove from local state
          setVideos(videos.filter(video => video.id !== id));
          alert('Video deleted successfully! (Development Mode)');
          return;
        }
        
        // In production, delete from Firebase
        await deleteVideo(id);
        // Update local state
        setVideos(videos.filter(video => video.id !== id));
        alert('Video deleted successfully!');
      } catch (error) {
        console.error('Error deleting video:', error);
        alert('Error deleting video. Please try again.');
      }
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        if (process.env.NODE_ENV === 'development') {
          // In development mode, just remove from local state
          setImages(images.filter(image => image.id !== id));
          alert('Image deleted successfully! (Development Mode)');
          return;
        }
        
        // In production, delete from Firebase
        await deleteImage(id);
        // Update local state
        setImages(images.filter(image => image.id !== id));
        alert('Image deleted successfully!');
      } catch (error) {
        console.error('Error deleting image:', error);
        alert('Error deleting image. Please try again.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white py-10 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-purple-400">Content Management</h1>
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

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-400"></div>
        </div>
      ) : (
        <>
          {/* Add New Content Form */}
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-purple-400">
              Add New {activeTab === 'videos' ? 'Video' : 'Image'}
            </h2>
            <form
              onSubmit={activeTab === 'videos' ? handleVideoSubmit : handleImageSubmit}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={activeTab === 'videos' ? newVideo.title : newImage.title}
                    onChange={activeTab === 'videos' ? handleVideoChange : handleImageChange}
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
                    name="description"
                    value={activeTab === 'videos' ? newVideo.description : newImage.description}
                    onChange={activeTab === 'videos' ? handleVideoChange : handleImageChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              {activeTab === 'videos' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Duration (MM:SS)
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={newVideo.duration}
                      onChange={handleVideoChange}
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
                        name="premium"
                        checked={newVideo.premium}
                        onChange={handleVideoChange}
                        className="w-4 h-4 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                      />
                      <span className="ml-2 text-gray-300">Premium</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'images' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Premium Content
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="premium"
                      checked={newImage.premium}
                      onChange={handleImageChange}
                      className="w-4 h-4 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                    />
                    <span className="ml-2 text-gray-300">Premium</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeTab === 'videos' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Video File
                      </label>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoFileChange}
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
                        onChange={handleThumbnailFileChange}
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Image Files
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={activeTab === 'videos' ? videoUploading : imageUploading}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {activeTab === 'videos' ? videoUploading ? 'Uploading...' : 'Upload Video' : imageUploading ? 'Uploading...' : 'Upload Image'}
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
              {(activeTab === 'videos' ? videos : images).map((item) => (
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
                        onClick={() =>
                          activeTab === 'videos'
                            ? handleDeleteVideo(item.id)
                            : handleDeleteImage(item.id)
                        }
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPanel; 
