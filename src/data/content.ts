import { Video, Image } from '../types';

export const videos: Video[] = [
  {
    id: 'v1',
    type: 'video',
    title: 'Advanced Portrait Retouching Tutorial',
    thumbnailUrl: 'https://i.ytimg.com/vi/rTAZlHGOVo8/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=rTAZlHGOVo8',
    youtubeId: 'rTAZlHGOVo8',
    duration: '15:24',
    views: 125000,
    likes: 12400,
    dislikes: 120,
    premium: false,
    description: 'Learn advanced portrait retouching techniques using AI-powered tools.',
    category: 'tutorial'
  },
  {
    id: 'v2',
    type: 'video',
    title: 'AI Style Transfer Masterclass',
    thumbnailUrl: 'https://i.ytimg.com/vi/9BFuUfL_Ucw/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=9BFuUfL_Ucw',
    youtubeId: '9BFuUfL_Ucw',
    duration: '23:15',
    views: 89000,
    likes: 9500,
    dislikes: 85,
    premium: true,
    description: 'Master the art of AI style transfer with this comprehensive guide.',
    category: 'tutorial'
  },
  {
    id: 'v3',
    type: 'video',
    title: 'Professional Lighting Techniques',
    thumbnailUrl: 'https://i.ytimg.com/vi/j_Sov3xmgwg/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=j_Sov3xmgwg',
    youtubeId: 'j_Sov3xmgwg',
    duration: '18:45',
    views: 256000,
    likes: 18900,
    dislikes: 230,
    premium: true,
    description: 'Learn professional lighting techniques for portrait photography.',
    category: 'tutorial'
  }
];

export const images: Image[] = [
  {
    id: 'i1',
    type: 'image',
    title: 'Ethereal Portrait Series #1',
    thumbnailUrl: 'https://cdn.pixabay.com/photo/2024/05/11/13/32/portrait-8754957_640.jpg',
    imageUrl: 'https://cdn.pixabay.com/photo/2024/05/11/13/32/portrait-8754957_1280.jpg',
    description: 'A stunning ethereal portrait showcasing the power of AI enhancement',
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
    imageUrl: 'https://cdn.pixabay.com/photo/2024/05/11/13/32/portrait-8754961_1280.png',
    description: 'Digital art transformation using advanced AI algorithms',
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
    imageUrl: 'https://cdn.pixabay.com/photo/2017/11/26/21/17/woman-2979961_1280.jpg',
    description: 'A collection of modern portraits enhanced with our AI technology',
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
    imageUrl: 'https://cdn.pixabay.com/photo/2016/01/08/16/04/woman-1128523_1280.jpg',
    description: 'Artistic style blending using neural networks',
    resolution: '4K (3840x2160)',
    category: 'artistic',
    views: 134000,
    likes: 14200,
    dislikes: 120,
    premium: true,
    createdAt: '2024-03-09T13:20:00Z'
  }
]; 