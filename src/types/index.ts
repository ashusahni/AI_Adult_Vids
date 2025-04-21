export interface BaseContent {
  id: string;
  title: string;
  description: string;
  category: string;
  premium: boolean;
  likes: number;
  dislikes: number;
  views: number;
  thumbnailUrl: string;
  createdAt: string;
}

export interface Video extends BaseContent {
  videoUrl: string;
  duration: string;
}

export interface Image extends BaseContent {
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