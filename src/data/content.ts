import { Video, Image } from '../types';

export const videos: Video[] = [
  {
    id: 'v1',
    type: 'video',
    title: 'Advanced Portrait Retouching Tutorial',
    thumbnailUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    duration: '15:24',
    views: 125000,
    likes: 12400,
    dislikes: 120,
    premium: false,
    createdAt: '2024-03-15T10:00:00Z'
  },
  {
    id: 'v2',
    type: 'video',
    title: 'AI Style Transfer Masterclass',
    thumbnailUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    duration: '23:15',
    views: 89000,
    likes: 9500,
    dislikes: 85,
    premium: true,
    createdAt: '2024-03-14T15:30:00Z'
  },
  {
    id: 'v3',
    type: 'video',
    title: 'Professional Lighting Techniques',
    thumbnailUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
    duration: '18:45',
    views: 256000,
    likes: 18900,
    dislikes: 230,
    premium: true,
    createdAt: '2024-03-13T09:15:00Z'
  }
];

export const images: Image[] = [
  {
    id: 'i1',
    type: 'image',
    title: 'Ethereal Portrait Series #1',
    thumbnailUrl: 'https://cdn.pixabay.com/photo/2024/05/11/13/32/portrait-8754957_640.jpg',
    resolution: '4K (3840x2160)',
    category: 'portrait',
    views: 145000,
    likes: 15600,
    dislikes: 180,
    premium: false,
    createdAt: '2024-03-12T14:20:00Z'
  },
  {
    id: 'i2',
    type: 'image',
    title: 'Digital Art Transformation',
    thumbnailUrl: 'https://cdn.pixabay.com/photo/2024/05/11/13/32/portrait-8754961_640.png',
    resolution: '4K (3840x2160)',
    category: 'style-transfer',
    views: 198000,
    likes: 21300,
    dislikes: 145,
    premium: true,
    createdAt: '2024-03-11T11:45:00Z'
  },
  {
    id: 'i3',
    type: 'image',
    title: 'Modern Portrait Collection',
    thumbnailUrl: 'https://cdn.pixabay.com/photo/2017/11/26/21/17/woman-2979961_640.jpg',
    resolution: '4K (3840x2160)',
    category: 'portrait',
    views: 167000,
    likes: 19200,
    dislikes: 160,
    premium: false,
    createdAt: '2024-03-10T16:30:00Z'
  },
  {
    id: 'i4',
    type: 'image',
    title: 'Artistic Style Blend',
    thumbnailUrl: 'https://cdn.pixabay.com/photo/2016/01/08/16/04/woman-1128523_640.jpg',
    resolution: '4K (3840x2160)',
    category: 'artistic',
    views: 134000,
    likes: 14200,
    dislikes: 120,
    premium: true,
    createdAt: '2024-03-09T13:20:00Z'
  }
]; 