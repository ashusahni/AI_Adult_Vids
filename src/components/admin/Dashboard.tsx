import React, { useEffect, useState } from 'react';
import { getAnalytics } from '../../firebase/admin';
import { Analytics } from '../../types/admin';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAnalytics();
        setAnalytics(data);
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

  if (!analytics) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="text-gray-300 mb-4">No analytics data available.</div>
        <div className="text-sm text-gray-400">
          This could be because:
          <ul className="list-disc mt-2 text-left">
            <li>No users have signed up yet</li>
            <li>No content has been uploaded</li>
            <li>No user activity has been recorded</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-purple-400">Dashboard</h1>
      
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
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-purple-400">Recent Users</h2>
          {analytics.recentRegistrations.length > 0 ? (
            <div className="space-y-3">
              {analytics.recentRegistrations.slice(0, 5).map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-100">{user.username}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-4">
              No recent registrations
            </div>
          )}
        </div>

        {/* Popular Content */}
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4 text-purple-400">Popular Content</h2>
          {analytics.popularContent.length > 0 ? (
            <div className="space-y-3">
              {analytics.popularContent.slice(0, 5).map((content) => (
                <div key={content.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-100">{content.title}</p>
                    <p className="text-sm text-gray-400">
                      {content.type} • {content.views} views
                    </p>
                  </div>
                  <span className="text-sm text-purple-400">
                    ❤️ {content.likes}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-4">
              No content available
            </div>
          )}
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 text-purple-400">Revenue Overview</h2>
        <div className="space-y-4">
          {analytics.dailyStats.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Daily Revenue</h3>
                  <div className="space-y-2">
                    {analytics.dailyStats.slice(-7).map((stat) => (
                      <div key={stat.date} className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{new Date(stat.date).toLocaleDateString()}</span>
                        <span className="font-medium text-gray-100">${stat.revenue.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Daily Registrations</h3>
                  <div className="space-y-2">
                    {analytics.dailyStats.slice(-7).map((stat) => (
                      <div key={stat.date} className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{new Date(stat.date).toLocaleDateString()}</span>
                        <span className="font-medium text-gray-100">{stat.registrations}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-400 py-4">
              No revenue data available
            </div>
          )}
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

export default Dashboard; 