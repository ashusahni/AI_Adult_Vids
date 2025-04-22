import React from 'react';
import { Wand2, MessageSquare, Image, Download, Sparkles } from 'lucide-react';

const steps = [
  {
    title: 'Create Your Account',
    description: 'Sign up for a free account to get started. Choose between our Basic, Pro, or Enterprise plans based on your needs.',
    icon: Wand2,
  },
  {
    title: 'Choose Your Creation Type',
    description: 'Select whether you want to create AI-generated images or have an AI chat conversation. Our platform supports both text-to-image and conversational AI.',
    icon: MessageSquare,
  },
  {
    title: 'For AI Images',
    description: 'Enter your prompt describing the image you want to create. Be specific about details like style, colors, and composition. Our AI will generate multiple options for you to choose from.',
    icon: Image,
  },
  {
    title: 'For AI Chats',
    description: 'Start a conversation with our AI assistant. You can ask questions, get creative writing help, or have engaging discussions on various topics.',
    icon: MessageSquare,
  },
  {
    title: 'Customize & Enhance',
    description: 'Edit and refine your creations. For images, you can adjust parameters like style, resolution, and effects. For chats, you can guide the conversation in your desired direction.',
    icon: Sparkles,
  },
  {
    title: 'Download & Share',
    description: 'Once you\'re satisfied with your creation, download it in your preferred format or share it directly with others. All your creations are stored in your personal gallery.',
    icon: Download,
  },
];

const HowItWorksPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">How It Works</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Create stunning AI-generated images and have meaningful conversations with our advanced AI assistant in just a few simple steps.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-start gap-6 bg-gray-900/50 rounded-lg p-6 hover:bg-gray-900/70 transition-colors duration-200"
                >
                  <div className="flex-shrink-0">
                    <div className="bg-purple-500/20 rounded-lg p-3">
                      <Icon className="h-6 w-6 text-purple-500" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-purple-500 font-bold">Step {index + 1}</span>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Features Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">Additional Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-900/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">AI Image Generation</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Multiple style options (realistic, artistic, abstract)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    High-resolution downloads
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Batch generation capabilities
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Custom aspect ratios
                  </li>
                </ul>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">AI Chat Assistant</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Natural conversation flow
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Context-aware responses
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Multiple language support
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Conversation history
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage; 