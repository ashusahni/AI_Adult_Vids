import { Image, Video } from '../types';

export const sampleImages: Image[] = [
  {
    id: '1',
    title: 'Beautiful Sunset',
    description: 'A stunning sunset over the ocean',
    thumbnailUrl: '/images/sunset-thumb.jpg',
    imageUrl: '/images/sunset.jpg',
    resolution: '4K (3840x2160)',
    likes: 1200,
    dislikes: 50,
    category: 'Nature',
    premium: false,
    uploadDate: '2024-03-15'
  },
  {
    id: '2',
    title: 'City Lights',
    description: 'Night cityscape with vibrant lights',
    thumbnailUrl: '/images/city-thumb.jpg',
    imageUrl: '/images/city.jpg',
    resolution: '4K (3840x2160)',
    likes: 850,
    dislikes: 30,
    category: 'Urban',
    premium: true,
    uploadDate: '2024-03-14'
  }
];

export const sampleVideos: Video[] = [
  {
    id: '1',
    title: 'Mountain Adventure',
    description: 'Epic journey through the mountains',
    thumbnailUrl: '/videos/mountain-thumb.jpg',
    videoUrl: '/videos/mountain.mp4',
    duration: '10:30',
    views: 5000,
    likes: 2000,
    dislikes: 100,
    category: 'Adventure',
    premium: false,
    uploadDate: '2024-03-15'
  },
  {
    id: '2',
    title: 'Cooking Masterclass',
    description: 'Learn to cook like a pro',
    thumbnailUrl: '/videos/cooking-thumb.jpg',
    videoUrl: '/videos/cooking.mp4',
    duration: '25:15',
    views: 8000,
    likes: 3000,
    dislikes: 150,
    category: 'Education',
    premium: true,
    uploadDate: '2024-03-14'
  }
]; 