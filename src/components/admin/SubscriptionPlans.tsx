import React, { useEffect, useState } from 'react';
import { getSubscriptionPlans, createSubscriptionPlan, updateSubscriptionPlan } from '../../firebase/admin';
import { SubscriptionPlan } from '../../types/admin';

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const data = await getSubscriptionPlans();
      setPlans(data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlan = async (plan: Omit<SubscriptionPlan, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await createSubscriptionPlan(plan);
      fetchPlans();
      setIsEditing(false);
    } catch (error) {
      console.error('Error creating plan:', error);
    }
  };

  const handleUpdatePlan = async (planId: string, updates: Partial<SubscriptionPlan>) => {
    try {
      await updateSubscriptionPlan(planId, updates);
      fetchPlans();
      setIsEditing(false);
      setEditingPlan(null);
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Subscription Plans</h1>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Add New Plan
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-lg shadow p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">{plan.name}</h3>
                <p className="text-2xl font-bold">${plan.price}/month</p>
              </div>
              <button
                onClick={() => {
                  setEditingPlan(plan);
                  setIsEditing(true);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                Edit
              </button>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Features</h4>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <span className="mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Duration</span>
                <span>{plan.duration} months</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-500">Status</span>
                <span className={plan.isActive ? 'text-green-600' : 'text-red-600'}>
                  {plan.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editingPlan ? 'Edit Plan' : 'Create New Plan'}
            </h2>
            {/* Add form fields here */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditingPlan(null);
                }}
                className="text-gray-500 mr-4"
              >
                Cancel
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded">
                {editingPlan ? 'Save Changes' : 'Create Plan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlans; 