import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  addDoc,
  Timestamp,
  limit,
  startAfter
} from 'firebase/firestore';
import { db } from './config';
import { User, SubscriptionPlan, Payment, Analytics } from '../types/admin';

// User Management
export const getUsers = async (page = 1, perPage = 10) => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef,
      orderBy('createdAt', 'desc'),
      limit(perPage),
      startAfter((page - 1) * perPage)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as User));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const updateUserStatus = async (userId: string, status: User['status']) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { 
      status,
      isSuspended: status === 'suspended',
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating user status:', error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      status: 'deleted',
      deletedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Subscription Plans Management
export const getSubscriptionPlans = async () => {
  try {
    const plansRef = collection(db, 'subscriptionPlans');
    const q = query(plansRef, orderBy('price', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as SubscriptionPlan));
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    throw error;
  }
};

export const createSubscriptionPlan = async (plan: Omit<SubscriptionPlan, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const plansRef = collection(db, 'subscriptionPlans');
    const now = Timestamp.now();
    const docRef = await addDoc(plansRef, {
      ...plan,
      createdAt: now,
      updatedAt: now
    });
    return {
      id: docRef.id,
      ...plan,
      createdAt: now.toDate().toISOString(),
      updatedAt: now.toDate().toISOString()
    } as SubscriptionPlan;
  } catch (error) {
    console.error('Error creating subscription plan:', error);
    throw error;
  }
};

export const updateSubscriptionPlan = async (planId: string, updates: Partial<SubscriptionPlan>) => {
  try {
    const planRef = doc(db, 'subscriptionPlans', planId);
    await updateDoc(planRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating subscription plan:', error);
    throw error;
  }
};

// Payments Management
export const getPayments = async (page = 1, perPage = 10) => {
  try {
    const paymentsRef = collection(db, 'payments');
    const q = query(
      paymentsRef,
      orderBy('createdAt', 'desc'),
      limit(perPage),
      startAfter((page - 1) * perPage)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Payment));
  } catch (error) {
    console.error('Error fetching payments:', error);
    throw error;
  }
};

export const getUserPayments = async (userId: string) => {
  try {
    const paymentsRef = collection(db, 'payments');
    const q = query(
      paymentsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Payment));
  } catch (error) {
    console.error('Error fetching user payments:', error);
    throw error;
  }
};

// Analytics
export const getAnalytics = async (): Promise<Analytics> => {
  try {
    // Get total users
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersRef);
    const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as User));
    
    // Get recent payments
    const paymentsRef = collection(db, 'payments');
    const paymentsQuery = query(
      paymentsRef,
      where('status', '==', 'completed'),
      orderBy('createdAt', 'desc'),
      limit(30)
    );
    const paymentsSnapshot = await getDocs(paymentsQuery);
    const payments = paymentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Payment));

    // Calculate analytics
    const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const activeUsers = users.filter(user => user.status === 'active').length;
    const premiumUsers = users.filter(user => user.isSubscribed).length;

    // Get content stats
    const contentRef = collection(db, 'content');
    const contentQuery = query(contentRef, orderBy('views', 'desc'), limit(10));
    const contentSnapshot = await getDocs(contentQuery);
    const popularContent = contentSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Calculate daily stats for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const dailyStats = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayPayments = payments.filter(p => 
        new Date(p.createdAt).toISOString().split('T')[0] === dateStr
      );
      
      return {
        date: dateStr,
        revenue: dayPayments.reduce((sum, p) => sum + p.amount, 0),
        registrations: users.filter(u => 
          new Date(u.createdAt).toISOString().split('T')[0] === dateStr
        ).length,
        views: 0, // You'll need to implement view tracking
        likes: 0  // You'll need to implement like tracking
      };
    });

    return {
      totalUsers: users.length,
      activeUsers,
      premiumUsers,
      totalViews: popularContent.reduce((sum, content) => sum + (content.views || 0), 0),
      totalLikes: popularContent.reduce((sum, content) => sum + (content.likes || 0), 0),
      totalRevenue,
      recentRegistrations: users
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10),
      popularContent,
      dailyStats
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
}; 