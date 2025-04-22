import React from 'react';
import { features } from '../data/sampleContent';
import { UserCircle, Palette, Scissors, Maximize } from 'lucide-react';

const iconMap = {
  UserCircle: UserCircle,
  Palette: Palette,
  Scissors: Scissors,
  Maximize: Maximize,
};

const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Features</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </div>
    </div>
  );
};

export default FeaturesPage; 