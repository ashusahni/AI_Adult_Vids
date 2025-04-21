import React from 'react';
import ContentCard from './ContentCard';
import { Image, Video } from '../types';
import { sampleImages, sampleVideos } from '../data/sampleData';

const ContentGrid: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Featured Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sampleImages.map((image) => (
            <ContentCard key={image.id} content={image} type="image" />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Featured Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sampleVideos.map((video) => (
            <ContentCard key={video.id} content={video} type="video" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentGrid; 