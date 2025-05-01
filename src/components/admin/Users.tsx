import React, { useEffect, useState } from 'react';
import { getUsers, updateUserStatus, deleteUser } from '../../firebase/admin';
import { User } from '../../types/admin';

const formatDate = (timestamp: any) => {
  if (!timestamp) return 'N/A';
  try {
    const date = timestamp.toDate?.() || new Date(timestamp);
    return date.toLocaleDateString();
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedUsers = await getUsers(currentPage);
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (userId: string, newStatus: User['status']) => {
    try {
      await updateUserStatus(userId, newStatus);
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      ));
    } catch (error) {
      console.error('Error updating user status:', error);
      setError('Failed to update user status. Please try again.');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      // Update local state
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user. Please try again.');
    }
  };

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
          onClick={() => fetchUsers()}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <div className="text-gray-300 mb-4">No users found.</div>
        <div className="text-sm text-gray-400">
          This could be because:
          <ul className="list-disc mt-2 text-left">
            <li>No users have signed up yet</li>
            <li>You don't have admin permissions</li>
            <li>The database connection is not properly configured</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-purple-400">Users</h1>
      
      <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Subscription</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-100">{user.username || 'No username'}</div>
                      <div className="text-sm text-gray-400">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' :
                    user.status === 'suspended' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.subscriptionTier || 'Free'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {formatDate(user.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    {user.status !== 'active' && (
                      <button
                        onClick={() => handleStatusChange(user.id, 'active')}
                        className="text-green-400 hover:text-green-500"
                      >
                        Activate
                      </button>
                    )}
                    {user.status !== 'suspended' && (
                      <button
                        onClick={() => handleStatusChange(user.id, 'suspended')}
                        className="text-yellow-400 hover:text-yellow-500"
                      >
                        Suspend
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-400 hover:text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-300">Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage(p => p + 1)}
          disabled={users.length < 10}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users; 