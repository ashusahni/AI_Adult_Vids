import React, { useEffect, useState } from 'react';
import { getAnalytics } from '../../firebase/admin';
import { Analytics as AnalyticsType } from '../../types/admin';

const Analytics = () => {
  const [data, setData] = useState<AnalyticsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        const analyticsData = await getAnalytics();
        setData(analyticsData);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setError('Failed to load analytics data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="text-gray-300 mb-4">No analytics data available.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-purple-400">Analytics Overview</h1>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Users"
          value={data.totalUsers}
          icon="👥"
        />
        <MetricCard
          title="Premium Users"
          value={data.premiumUsers}
          icon="💎"
        />
        <MetricCard
          title="Total Revenue"
          value={`$${data.totalRevenue.toFixed(2)}`}
          icon="💰"
        />
        <MetricCard
          title="Total Views"
          value={data.totalViews}
          icon="👁️"
        />
      </div>

      {/* Charts and Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-purple-400">Revenue Trend</h2>
          <div className="space-y-2">
            {data.dailyStats.map((stat) => (
              <div key={stat.date} className="flex items-center justify-between">
                <span className="text-sm text-gray-300">
                  {new Date(stat.date).toLocaleDateString()}
                </span>
                <span className="font-medium text-gray-100">
                  ${stat.revenue.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-purple-400">Popular Content</h2>
          <div className="space-y-3">
            {data.popularContent.map((content) => (
              <div key={content.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-100">{content.title}</p>
                  <p className="text-sm text-gray-400">
                    {content.views} views • {content.likes} likes
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, icon }: { title: string; value: string | number; icon: string }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow">
    <div className="flex items-center justify-between">
      <span className="text-2xl">{icon}</span>
      <span className="text-gray-400">{title}</span>
    </div>
    <div className="mt-4 text-2xl font-bold text-gray-100">{value}</div>
  </div>
);

export default Analytics; 