import React, { useEffect, useState } from 'react';
import { getAnalytics } from '../../firebase/admin';
import { Analytics as AnalyticsType } from '../../types/admin';

const Analytics = () => {
  const [analytics, setAnalytics] = useState<AnalyticsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const data = await getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-red-500">Error loading analytics data</div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Revenue"
          value={`$${analytics.totalRevenue.toFixed(2)}`}
          icon="💰"
        />
        <MetricCard
          title="Active Users"
          value={analytics.activeUsers}
          icon="👥"
        />
        <MetricCard
          title="Total Views"
          value={analytics.totalViews}
          icon="👁️"
        />
        <MetricCard
          title="Total Likes"
          value={analytics.totalLikes}
          icon="❤️"
        />
      </div>

      {/* Daily Stats Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Daily Statistics</h2>
        <div className="h-64">
          {/* Chart will be implemented here */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Revenue Trend</h3>
              <div className="space-y-2">
                {analytics.dailyStats.slice(-7).map((stat) => (
                  <div key={stat.date} className="flex items-center justify-between">
                    <span className="text-sm">{new Date(stat.date).toLocaleDateString()}</span>
                    <span className="font-medium">${stat.revenue.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">User Registrations</h3>
              <div className="space-y-2">
                {analytics.dailyStats.slice(-7).map((stat) => (
                  <div key={stat.date} className="flex items-center justify-between">
                    <span className="text-sm">{new Date(stat.date).toLocaleDateString()}</span>
                    <span className="font-medium">{stat.registrations}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Content */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Popular Content</h2>
        <div className="space-y-4">
          {analytics.popularContent.map((content) => (
            <div key={content.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{content.title}</p>
                <p className="text-sm text-gray-500">
                  {content.type} • {content.views} views • {content.likes} likes
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Recent Registrations</h2>
        <div className="space-y-4">
          {analytics.recentRegistrations.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{user.username}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, icon }: { title: string; value: string | number; icon: string }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center justify-between">
      <span className="text-2xl">{icon}</span>
      <span className="text-gray-500">{title}</span>
    </div>
    <div className="mt-4 text-2xl font-bold">{value}</div>
  </div>
);

export default Analytics; 