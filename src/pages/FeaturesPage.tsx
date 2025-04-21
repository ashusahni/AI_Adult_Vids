import React from 'react';
import { features } from '../data/sampleContent';
import { UserCircle, Palette, Scissors, Maximize } from 'lucide-react';

const iconMap = {
  UserCircle: UserCircle,
  Palette: Palette,
  Scissors: Scissors,
  Maximize: Maximize,
};

export const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-b from-purple-900/20 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Powerful AI Features
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Transform your content with our cutting-edge AI technology
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <div
                key={feature.id}
                className="bg-gray-900/50 rounded-lg p-6 hover:bg-gray-900/70 transition-colors duration-200"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-purple-500/20 rounded-lg p-3">
                    <Icon className="h-6 w-6 text-purple-500" />
                  </div>
                  <h3 className="ml-4 text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Content?
          </h2>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
              Get Started
            </button>
            <button className="px-6 py-3 border border-purple-500 text-purple-500 rounded-lg hover:bg-purple-500 hover:text-white transition-colors duration-200">
              View Pricing
            </button>
          </div>
        </div>
      </div>

      {/* Example Section */}
      <div className="bg-gray-900/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            See Our AI in Action
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black rounded-lg overflow-hidden">
              <img
                src="/images/example-1.jpg"
                alt="Before"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-white font-semibold">Original Image</h3>
                <p className="text-gray-400 text-sm">Before AI enhancement</p>
              </div>
            </div>
            <div className="bg-black rounded-lg overflow-hidden">
              <img
                src="/images/example-2.jpg"
                alt="Processing"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-white font-semibold">AI Processing</h3>
                <p className="text-gray-400 text-sm">During enhancement</p>
              </div>
            </div>
            <div className="bg-black rounded-lg overflow-hidden">
              <img
                src="/images/example-3.jpg"
                alt="After"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-white font-semibold">Enhanced Result</h3>
                <p className="text-gray-400 text-sm">After AI enhancement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 