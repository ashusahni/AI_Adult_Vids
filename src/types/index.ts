export interface BaseContent {
  id: string;
  title: string;
  description: string;
  category: string;
  isPremium: boolean;
  likes: number;
  dislikes: number;
  views: number;
  thumbnailUrl: string;
  createdAt: string;
  type: 'video' | 'image';
}

export interface Video extends BaseContent {
  type: 'video';
  videoUrl: string;
  youtubeId: string;
  duration: string;
}

export interface Image extends BaseContent {
  type: 'image';
  imageUrl: string;
  resolution: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  isSubscribed: boolean;
  createdAt: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: 'monthly' | 'yearly';
  features: string[];
  isPopular?: boolean;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isSubscribed: boolean;
  isAgeVerified: boolean;
};