import { Video, Image, PricingPlan, Feature } from '../types';

export const sampleVideos: Video[] = [
  {
    id: '1',
    title: 'Advanced Portrait Retouching',
    description: 'Learn professional techniques for portrait retouching using AI tools',
    category: 'Tutorial',
    premium: true,
    likes: 2500,
    dislikes: 50,
    views: 15000,
    thumbnailUrl: '/videos/portrait-thumb.jpg',
    videoUrl: '/videos/portrait.mp4',
    duration: '15:30',
    createdAt: '2024-03-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'AI Style Transfer Masterclass',
    description: 'Master the art of AI style transfer with our comprehensive guide',
    category: 'Education',
    premium: true,
    likes: 1800,
    dislikes: 40,
    views: 12000,
    thumbnailUrl: '/videos/style-transfer-thumb.jpg',
    videoUrl: '/videos/style-transfer.mp4',
    duration: '12:45',
    createdAt: '2024-03-14T15:30:00Z'
  },
  {
    id: '3',
    title: 'Quick AI Photo Enhancement',
    description: 'Learn quick techniques to enhance your photos using AI',
    category: 'Tutorial',
    premium: false,
    likes: 3200,
    dislikes: 60,
    views: 20000,
    thumbnailUrl: '/videos/enhancement-thumb.jpg',
    videoUrl: '/videos/enhancement.mp4',
    duration: '08:20',
    createdAt: '2024-03-13T09:15:00Z'
  }
];

export const sampleImages: Image[] = [
  {
    id: '1',
    title: 'AI-Enhanced Portrait',
    description: 'Beautiful portrait enhanced with our AI technology',
    category: 'Portrait',
    premium: true,
    likes: 1500,
    dislikes: 30,
    views: 8000,
    thumbnailUrl: '/images/portrait-thumb.jpg',
    imageUrl: '/images/portrait.jpg',
    resolution: '4K (3840x2160)',
    createdAt: '2024-03-15T08:00:00Z'
  },
  {
    id: '2',
    title: 'Style Transfer Art',
    description: 'Amazing style transfer result using neural networks',
    category: 'Art',
    premium: true,
    likes: 2200,
    dislikes: 45,
    views: 11000,
    thumbnailUrl: '/images/style-art-thumb.jpg',
    imageUrl: '/images/style-art.jpg',
    resolution: '4K (3840x2160)',
    createdAt: '2024-03-14T14:30:00Z'
  },
  {
    id: '3',
    title: 'Enhanced Landscape',
    description: 'AI-enhanced landscape photography',
    category: 'Landscape',
    premium: false,
    likes: 1800,
    dislikes: 35,
    views: 9500,
    thumbnailUrl: '/images/landscape-thumb.jpg',
    imageUrl: '/images/landscape.jpg',
    resolution: '4K (3840x2160)',
    createdAt: '2024-03-13T11:20:00Z'
  }
];

export const pricingPlans: PricingPlan[] = [
  {
    id: '1',
    name: 'Basic',
    price: 9.99,
    interval: 'monthly',
    features: [
      'Access to basic AI tools',
      'Standard quality exports',
      'Community support',
      '5 exports per day'
    ]
  },
  {
    id: '2',
    name: 'Pro',
    price: 19.99,
    interval: 'monthly',
    features: [
      'Access to all AI tools',
      '4K quality exports',
      'Priority support',
      'Unlimited exports',
      'Custom styles'
    ],
    isPopular: true
  },
  {
    id: '3',
    name: 'Enterprise',
    price: 49.99,
    interval: 'monthly',
    features: [
      'All Pro features',
      'API access',
      'Dedicated support',
      'Custom AI model training',
      'Team collaboration'
    ]
  }
];

export const features: Feature[] = [
  {
    id: '1',
    title: 'AI Portrait Enhancement',
    description: 'Enhance portraits using advanced AI algorithms',
    icon: 'UserCircle'
  },
  {
    id: '2',
    title: 'Style Transfer',
    description: 'Apply artistic styles to your images using neural networks',
    icon: 'Palette'
  },
  {
    id: '3',
    title: 'Background Removal',
    description: 'Automatically remove backgrounds with precision',
    icon: 'Scissors'
  },
  {
    id: '4',
    title: 'Super Resolution',
    description: 'Upscale images while maintaining quality',
    icon: 'Maximize'
  }
]; 