export interface BaseContent {
  id: string;
  title: string;
  thumbnailUrl: string;
  views: number;
  likes: number;
  dislikes: number;
  premium: boolean;
  createdAt: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  views: number;
  likes: number;
  dislikes: number;
  category: string;
  premium: boolean;
  uploadDate: string;
}

export interface Image {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  imageUrl: string;
  resolution: string;
  likes: number;
  dislikes: number;
  category: string;
  premium: boolean;
  uploadDate: string;
}

export type Content = Video | Image; 