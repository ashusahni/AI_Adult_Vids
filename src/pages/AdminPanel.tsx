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
    <div className="min-h-screen bg-gray-900 text-white py-10">
      <div className="max-w-[1440px] mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Panel</h1>
        
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              className={`px-6 py-2 rounded-md ${
                activeTab === 'videos' ? 'bg-purple-600' : 'bg-transparent hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('videos')}
            >
              Videos
            </button>
            <button
              className={`px-6 py-2 rounded-md ${
                activeTab === 'images' ? 'bg-purple-600' : 'bg-transparent hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('images')}
            >
              Images
            </button>
          </div>
        </div>

        {/* Videos Tab */}
        {activeTab === 'videos' && (
          <div>
            <div className="bg-gray-800 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Plus className="mr-2" size={20} />
                Add New Video
              </h2>
              
              <form onSubmit={handleVideoSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <label className="block text-gray-400 mb-2">Video Title</label>
                      <input
                        type="text"
                        name="title"
                        value={newVideo.title}
                        onChange={handleVideoChange}
                        className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter video title"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-400 mb-2">Description</label>
                      <textarea
                        name="description"
                        value={newVideo.description}
                        onChange={handleVideoChange}
                        className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
                        placeholder="Enter video description"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-400 mb-2">Duration</label>
                        <input
                          type="text"
                          name="duration"
                          value={newVideo.duration}
                          onChange={handleVideoChange}
                          className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="00:00"
                          required
                        />
                      </div>
                      
                      <div className="flex items-center">
                        <label className="flex items-center mt-4 cursor-pointer">
                          <input
                            type="checkbox"
                            name="premium"
                            checked={newVideo.premium}
                            onChange={handleVideoChange}
                            className="form-checkbox h-5 w-5 text-purple-600 rounded focus:ring-purple-500 border-gray-600 bg-gray-700"
                          />
                          <span className="ml-2 text-gray-300">Premium Content</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-4">
                      <label className="block text-gray-400 mb-2">Upload Video</label>
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                        <input
                          type="file"
                          onChange={handleVideoFileChange}
                          className="hidden"
                          id="video-upload"
                          accept="video/*"
                        />
                        <label
                          htmlFor="video-upload"
                          className="cursor-pointer flex flex-col items-center justify-center py-6"
                        >
                          <Upload className="mb-2" size={30} />
                          <span className="text-gray-400 mb-2">
                            {videoFile ? videoFile.name : 'Click to upload video file'}
                          </span>
                          <span className="text-xs text-gray-500">MP4, WebM or AVI. Max 500MB.</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-400 mb-2">Upload Thumbnail</label>
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                        <input
                          type="file"
                          onChange={handleThumbnailFileChange}
                          className="hidden"
                          id="thumbnail-upload"
                          accept="image/*"
                        />
                        <label
                          htmlFor="thumbnail-upload"
                          className="cursor-pointer flex flex-col items-center justify-center"
                        >
                          {newVideo.thumbnail ? (
                            <img
                              src={newVideo.thumbnail}
                              alt="Thumbnail preview"
                              className="h-32 object-cover rounded-lg mb-2"
                            />
                          ) : (
                            <Upload className="mb-2" size={30} />
                          )}
                          <span className="text-gray-400 mb-2">
                            {thumbnailFile ? thumbnailFile.name : 'Click to upload thumbnail'}
                          </span>
                          <span className="text-xs text-gray-500">JPG, PNG or WebP. 16:9 ratio recommended.</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-right">
                  <button
                    type="submit"
                    disabled={videoUploading}
                    className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg flex items-center ml-auto disabled:opacity-50"
                  >
                    {videoUploading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2" size={20} />
                        Save Video
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
            
            {/* Video List */}
            <h2 className="text-xl font-semibold mb-4">Manage Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map((video) => (
                <div key={video.id} className="bg-gray-800 rounded-xl overflow-hidden">
                  <div className="relative aspect-video">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs">
                      {video.duration}
                    </div>
                    {video.premium && (
                      <div className="absolute top-2 left-2 bg-purple-600 px-2 py-1 rounded text-xs font-medium">
                        PREMIUM
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1 line-clamp-1">{video.title}</h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{video.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{new Date(video.uploadDate).toLocaleDateString()}</span>
                      <button
                        onClick={() => handleDeleteVideo(video.id)}
                        className="text-red-500 hover:text-red-400 p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Images Tab */}
        {activeTab === 'images' && (
          <div>
            <div className="bg-gray-800 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Plus className="mr-2" size={20} />
                Add New Image
              </h2>
              
              <form onSubmit={handleImageSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <label className="block text-gray-400 mb-2">Image Title</label>
                      <input
                        type="text"
                        name="title"
                        value={newImage.title}
                        onChange={handleImageChange}
                        className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter image title"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-400 mb-2">Description</label>
                      <textarea
                        name="description"
                        value={newImage.description}
                        onChange={handleImageChange}
                        className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
                        placeholder="Enter image description"
                        required
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="flex items-center mt-4 cursor-pointer">
                        <input
                          type="checkbox"
                          name="premium"
                          checked={newImage.premium}
                          onChange={handleImageChange}
                          className="form-checkbox h-5 w-5 text-purple-600 rounded focus:ring-purple-500 border-gray-600 bg-gray-700"
                        />
                        <span className="ml-2 text-gray-300">Premium Content</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-4">
                      <label className="block text-gray-400 mb-2">Upload Image</label>
                      <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                        <input
                          type="file"
                          onChange={handleImageFileChange}
                          className="hidden"
                          id="image-upload"
                          accept="image/*"
                        />
                        <label
                          htmlFor="image-upload"
                          className="cursor-pointer flex flex-col items-center justify-center"
                        >
                          {newImage.url ? (
                            <img
                              src={newImage.url}
                              alt="Image preview"
                              className="h-48 object-contain rounded-lg mb-2"
                            />
                          ) : (
                            <Upload className="mb-2" size={30} />
                          )}
                          <span className="text-gray-400 mb-2">
                            {imageFile ? imageFile.name : 'Click to upload image'}
                          </span>
                          <span className="text-xs text-gray-500">JPG, PNG or WebP. Max 10MB.</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-right">
                  <button
                    type="submit"
                    disabled={imageUploading}
                    className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg flex items-center ml-auto disabled:opacity-50"
                  >
                    {imageUploading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2" size={20} />
                        Save Image
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
            
            {/* Image List */}
            <h2 className="text-xl font-semibold mb-4">Manage Images</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map((image) => (
                <div key={image.id} className="bg-gray-800 rounded-xl overflow-hidden">
                  <div className="relative aspect-video">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                    {image.premium && (
                      <div className="absolute top-2 left-2 bg-purple-600 px-2 py-1 rounded text-xs font-medium">
                        PREMIUM
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1 line-clamp-1">{image.title}</h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{image.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{new Date(image.uploadDate).toLocaleDateString()}</span>
                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        className="text-red-500 hover:text-red-400 p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel; 