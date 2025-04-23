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
  type: 'video';
  youtubeId: string;
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
  type: 'image';
}

export type Content = Video | Image; 