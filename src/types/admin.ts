export interface User {
  id: string;
  username: string;
  email: string;
  status: 'active' | 'suspended' | 'deleted';
  isSubscribed: boolean;
  subscriptionTier: string;
  createdAt: any; // Firebase Timestamp
  updatedAt?: any; // Firebase Timestamp
  deletedAt?: any; // Firebase Timestamp
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  features: string[];
  isActive: boolean;
  createdAt: any; // Firebase Timestamp
  updatedAt: any; // Firebase Timestamp
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  planId: string;
  createdAt: any; // Firebase Timestamp
}

export interface Content {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'image';
  url: string;
  thumbnail: string;
  duration?: string;
  premium: boolean;
  views: number;
  likes: number;
  uploadDate: any; // Firebase Timestamp
}

export interface DailyStat {
  date: string;
  registrations: number;
  revenue: number;
}

export interface Analytics {
  totalUsers: number;
  premiumUsers: number;
  totalRevenue: number;
  totalViews: number;
  recentRegistrations: User[];
  popularContent: Content[];
  dailyStats: DailyStat[];
} 