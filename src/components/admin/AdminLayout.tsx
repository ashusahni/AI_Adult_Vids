import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation();

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/users', label: 'Users', icon: '👥' },
    { path: '/admin/content', label: 'Content', icon: '🎬' },
    { path: '/admin/subscriptions', label: 'Subscriptions', icon: '💎' },
    { path: '/admin/payments', label: 'Payments', icon: '💰' },
    { path: '/admin/analytics', label: 'Analytics', icon: '📈' },
  ];

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 shadow-lg">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold text-purple-400">Admin Panel</h1>
        </div>
        <nav className="p-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 mb-2 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-purple-900 text-purple-400'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-900">
        <div className="p-8 text-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout; 