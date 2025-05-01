import React, { useEffect, useState } from 'react';
import { getAnalytics } from '../../firebase/admin';
import { Analytics } from '../../types/admin';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchAnalytics();
  }, []);

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
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Users"
          value={analytics.totalUsers}
          icon="👥"
        />
        <MetricCard
          title="Premium Users"
          value={analytics.premiumUsers}
          icon="💎"
        />
        <MetricCard
          title="Total Revenue"
          value={`$${analytics.totalRevenue.toFixed(2)}`}
          icon="💰"
        />
        <MetricCard
          title="Total Views"
          value={analytics.totalViews}
          icon="👁️"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Users</h2>
          <div className="space-y-3">
            {analytics.recentRegistrations.slice(0, 5).map((user) => (
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

        {/* Popular Content */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Popular Content</h2>
          <div className="space-y-3">
            {analytics.popularContent.slice(0, 5).map((content) => (
              <div key={content.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{content.title}</p>
                  <p className="text-sm text-gray-500">
                    {content.type} • {content.views} views
                  </p>
                </div>
                <span className="text-sm">
                  ❤️ {content.likes}
                </span>
              </div>
            ))}
          </div>
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

export default Dashboard; 