import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { images } from '../data/content';
import { ImageCard } from '../components/ImageCard';
import { Image } from '../types';
import { FaFilter, FaSearch } from 'react-icons/fa';

const ITEMS_PER_PAGE = 12;

export const ImagesPage: React.FC = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<Image[]>([]);
  const [filteredImages, setFilteredImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const loaderRef = useRef<HTMLDivElement>(null);

  // Categories would come from your data, this is just an example
  const categories = ['all', 'nature', 'architecture', 'people', 'technology', 'abstract'];

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !loading) {
        setPage(prev => prev + 1);
      }
    }, options);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading]);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch('/api/images?page=' + page);
        const data = await response.json();
        setImages(prev => [...prev, ...data]);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [page]);

  useEffect(() => {
    let filtered = images;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(img => img.category.toLowerCase() === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(img => 
        img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        img.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredImages(filtered);
  }, [images, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header with filters */}
      <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search images..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-4">
              <FaFilter className="text-purple-500" />
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Grid */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {filteredImages.map((image) => (
            <div key={image.id} className="break-inside-avoid">
              <ImageCard
                image={image}
                onClick={() => navigate(`/image/${image.id}`)}
                className="w-full"
              />
            </div>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
          </div>
        )}

        {/* Infinite Scroll Trigger */}
        <div ref={loaderRef} className="h-10" />
      </div>
    </div>
  );
}; 