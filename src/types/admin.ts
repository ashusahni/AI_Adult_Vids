export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  lastLogin: string;
  isSubscribed: boolean;
  subscriptionTier: 'free' | 'basic' | 'premium';
  subscriptionEndDate?: string;
  isSuspended: boolean;
  status: 'active' | 'suspended' | 'deleted';
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: number; // in months
  features: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  userId: string;
  userEmail: string;
  amount: number;
  planId: string;
  planName: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
  createdAt: string;
}

export interface Analytics {
  totalUsers: number;
  activeUsers: number;
  premiumUsers: number;
  totalViews: number;
  totalLikes: number;
  totalRevenue: number;
  recentRegistrations: User[];
  popularContent: {
    id: string;
    title: string;
    type: 'video' | 'image';
    views: number;
    likes: number;
  }[];
  dailyStats: {
    date: string;
    views: number;
    likes: number;
    registrations: number;
    revenue: number;
  }[];
} 