import React, { useState } from 'react';

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState<'videos' | 'images'>('videos');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Content Management</h1>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('videos')}
            className={`${
              activeTab === 'videos'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Videos
          </button>
          <button
            onClick={() => setActiveTab('images')}
            className={`${
              activeTab === 'images'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Images
          </button>
        </nav>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'videos' ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Video Library</h2>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Upload New Video
              </button>
            </div>
            {/* Video grid will go here */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-gray-500 text-center py-8">
                No videos uploaded yet
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Image Library</h2>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Upload New Image
              </button>
            </div>
            {/* Image grid will go here */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div className="text-gray-500 text-center py-8">
                No images uploaded yet
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentManagement; 