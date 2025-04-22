import React from 'react';
import { Wand2, Sparkles, Zap, Crown, Shield, Clock, Video, Image as ImageIcon, Check } from 'lucide-react';

const features = [
  {
    icon: <Wand2 className="w-6 h-6" />,
    title: 'AI-Powered Enhancement',
    description: 'Transform your content with our advanced AI algorithms that automatically enhance quality, adjust lighting, and optimize colors for professional-grade results.',
    benefits: [
      'Automatic quality enhancement',
      'Smart lighting adjustments',
      'Color optimization',
      'Noise reduction'
    ]
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: 'Smart Filters',
    description: 'Our intelligent filters adapt to your content, creating the perfect look with just one click. Choose from a variety of presets or create your own custom filters.',
    benefits: [
      'One-click enhancement',
      'Customizable presets',
      'Real-time preview',
      'Batch processing'
    ]
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: 'Video Processing',
    description: 'Process and enhance your videos with cutting-edge AI technology. Stabilize footage, improve quality, and add professional effects in minutes.',
    benefits: [
      'Video stabilization',
      'Quality enhancement',
      'Frame interpolation',
      'Background removal'
    ]
  },
  {
    icon: <ImageIcon className="w-6 h-6" />,
    title: 'Image Enhancement',
    description: 'Transform your images with professional-grade enhancement tools. From basic adjustments to artistic styles, create stunning visuals with ease.',
    benefits: [
      'High-resolution output',
      'Artistic style transfer',
      'Object removal',
      'Background replacement'
    ]
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Fast Processing',
    description: 'Experience lightning-fast processing powered by our state-of-the-art GPU infrastructure. Get results in seconds, not hours.',
    benefits: [
      'GPU-accelerated processing',
      'Parallel processing',
      'Cloud-based infrastructure',
      'Real-time preview'
    ]
  },
  {
    icon: <Crown className="w-6 h-6" />,
    title: 'Premium Features',
    description: 'Unlock exclusive features and priority processing with our premium subscription. Get access to advanced tools and dedicated support.',
    benefits: [
      'Priority processing',
      'Advanced AI models',
      'Dedicated support',
      'Custom solutions'
    ]
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Secure Processing',
    description: 'Your content is processed securely with enterprise-grade encryption. We never store your original files without your permission.',
    benefits: [
      'End-to-end encryption',
      'Secure cloud storage',
      'Data privacy compliance',
      'Automatic deletion'
    ]
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: '24/7 Processing',
    description: 'Process your content anytime with our always-available infrastructure. No waiting, no downtime, just instant results.',
    benefits: [
      '24/7 availability',
      'Global infrastructure',
      'Automatic scaling',
      'Instant processing'
    ]
  }
];

const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-12">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            <span className="block">Powerful Features for</span>
            <span className="block text-purple-500">Content Enhancement</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Discover our comprehensive suite of AI-powered tools designed to transform your content into stunning masterpieces.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative group bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-all duration-300"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 blur"></div>
                <div className="relative bg-gray-800 p-6 rounded-xl">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-500 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center text-gray-300">
                        <Check className="w-4 h-4 text-purple-500 mr-2" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="text-2xl font-bold text-purple-500 mb-2">1</div>
              <h3 className="text-xl font-semibold text-white mb-4">Upload Your Content</h3>
              <p className="text-gray-300">Simply drag and drop your images or videos into our platform. We support all major formats.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="text-2xl font-bold text-purple-500 mb-2">2</div>
              <h3 className="text-xl font-semibold text-white mb-4">Choose Enhancement</h3>
              <p className="text-gray-300">Select from our range of AI-powered enhancement options or create custom settings.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="text-2xl font-bold text-purple-500 mb-2">3</div>
              <h3 className="text-xl font-semibold text-white mb-4">Download Results</h3>
              <p className="text-gray-300">Get your enhanced content in seconds. Download in your preferred format and quality.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20">
          <div className="bg-gray-800 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-pink-800/20 pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Content?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl">
                Join thousands of creators who are already using our AI-powered tools to enhance their content. Start your free trial today and experience the difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/signup"
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
                >
                  Start Free Trial
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 border border-purple-500 text-base font-medium rounded-md text-purple-500 hover:bg-purple-500 hover:text-white transition-colors duration-200"
                >
                  Contact Sales
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage; 