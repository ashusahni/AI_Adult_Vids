import React, { useEffect, useState } from 'react';
import { getSubscriptionPlans, createSubscriptionPlan, updateSubscriptionPlan } from '../../firebase/admin';
import { SubscriptionPlan } from '../../types/admin';

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    duration: 1,
    features: [''],
    isActive: true
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSubscriptionPlans();
      setPlans(data);
    } catch (error) {
      console.error('Error fetching plans:', error);
      setError('Failed to load subscription plans. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSubscriptionPlan(formData);
      fetchPlans();
      setIsEditing(false);
      setFormData({
        name: '',
        description: '',
        price: 0,
        duration: 1,
        features: [''],
        isActive: true
      });
    } catch (error) {
      console.error('Error creating plan:', error);
      alert('Failed to create plan. Please try again.');
    }
  };

  const handleUpdatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;

    try {
      await updateSubscriptionPlan(editingPlan.id, formData);
      fetchPlans();
      setIsEditing(false);
      setEditingPlan(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        duration: 1,
        features: [''],
        isActive: true
      });
    } catch (error) {
      console.error('Error updating plan:', error);
      alert('Failed to update plan. Please try again.');
    }
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    });
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      features: newFeatures
    });
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
          onClick={fetchPlans}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-400">Subscription Plans</h1>
        <button
          onClick={() => {
            setIsEditing(true);
            setEditingPlan(null);
            setFormData({
              name: '',
              description: '',
              price: 0,
              duration: 1,
              features: [''],
              isActive: true
            });
          }}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Add New Plan
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-gray-800 rounded-lg shadow p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-100">{plan.name}</h3>
                <p className="text-2xl font-bold text-purple-400">${plan.price}/month</p>
              </div>
              <button
                onClick={() => {
                  setEditingPlan(plan);
                  setIsEditing(true);
                  setFormData({
                    name: plan.name,
                    description: plan.description,
                    price: plan.price,
                    duration: plan.duration,
                    features: [...plan.features],
                    isActive: plan.isActive
                  });
                }}
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                Edit
              </button>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-2">Features</h4>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-300">
                    <span className="mr-2 text-purple-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Duration</span>
                <span className="text-gray-300">{plan.duration} months</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-400">Status</span>
                <span className={plan.isActive ? 'text-green-400' : 'text-red-400'}>
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
          <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-purple-400">
              {editingPlan ? 'Edit Plan' : 'Create New Plan'}
            </h2>
            <form onSubmit={editingPlan ? handleUpdatePlan : handleCreatePlan} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Plan Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Price ($/month)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Duration (months)
                  </label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Features
                </label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter feature"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="text-purple-400 hover:text-purple-300 text-sm"
                >
                  + Add Feature
                </button>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                />
                <span className="ml-2 text-gray-300">Active</span>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingPlan(null);
                  }}
                  className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {editingPlan ? 'Save Changes' : 'Create Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlans; 