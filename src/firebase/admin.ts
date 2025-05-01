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
  startAfter,
  getDoc
} from 'firebase/firestore';
import { db } from './config';
import { User, SubscriptionPlan, Payment, Analytics } from '../types/admin';

// User Management
export const getUsers = async (page = 1, perPage = 10) => {
  try {
    const usersRef = collection(db, 'users');
    let q = query(
      usersRef,
      orderBy('createdAt', 'desc'),
      limit(perPage)
    );

    // If not first page, get the last document from previous page
    if (page > 1) {
      const previousPageQuery = query(
        usersRef,
        orderBy('createdAt', 'desc'),
        limit((page - 1) * perPage)
      );
      const previousPageSnapshot = await getDocs(previousPageQuery);
      const lastDoc = previousPageSnapshot.docs[previousPageSnapshot.docs.length - 1];
      
      if (lastDoc) {
        q = query(
          usersRef,
          orderBy('createdAt', 'desc'),
          startAfter(lastDoc),
          limit(perPage)
        );
      }
    }

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
    console.log('Updating user status:', userId, status);
    const userRef = doc(db, 'users', userId);
    
    // First verify the user exists
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }

    // Update the user status
    await updateDoc(userRef, { 
      status,
      updatedAt: Timestamp.now()
    });

    console.log('User status updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating user status:', error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    console.log('Deleting user:', userId);
    const userRef = doc(db, 'users', userId);
    
    // First verify the user exists
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }

    // Instead of actually deleting, mark as deleted
    await updateDoc(userRef, {
      status: 'deleted',
      deletedAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });

    console.log('User marked as deleted successfully');
    return true;
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
export const getAnalytics = async () => {
  try {
    // Get users
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const totalUsers = usersSnapshot.size;
    const premiumUsers = usersSnapshot.docs.filter(doc => doc.data().isSubscribed).length;
    
    // Get payments for revenue
    const paymentsSnapshot = await getDocs(collection(db, 'payments'));
    const totalRevenue = paymentsSnapshot.docs.reduce((sum, doc) => sum + (doc.data().amount || 0), 0);

    // Get content views
    const videosSnapshot = await getDocs(collection(db, 'videos'));
    const totalViews = videosSnapshot.docs.reduce((sum, doc) => sum + (doc.data().views || 0), 0);

    // Get recent registrations
    const recentUsersQuery = query(
      collection(db, 'users'),
      orderBy('createdAt', 'desc'),
      limit(5)
    );
    const recentUsersSnapshot = await getDocs(recentUsersQuery);
    const recentRegistrations = recentUsersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || new Date()
    }));

    // Get popular content
    const popularContentQuery = query(
      collection(db, 'videos'),
      orderBy('views', 'desc'),
      limit(5)
    );
    const popularContentSnapshot = await getDocs(popularContentQuery);
    const popularContent = popularContentSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      uploadDate: doc.data().uploadDate?.toDate?.() || new Date()
    }));

    // Calculate daily stats for the last 7 days
    const dailyStats = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);

      const dailyUsers = usersSnapshot.docs.filter(doc => {
        const createdAt = doc.data().createdAt;
        if (!createdAt) return false;
        const createdDate = createdAt.toDate?.() || new Date(createdAt);
        return createdDate >= date && createdDate < nextDate;
      }).length;

      const dailyRevenue = paymentsSnapshot.docs
        .filter(doc => {
          const createdAt = doc.data().createdAt;
          if (!createdAt) return false;
          const createdDate = createdAt.toDate?.() || new Date(createdAt);
          return createdDate >= date && createdDate < nextDate;
        })
        .reduce((sum, doc) => sum + (doc.data().amount || 0), 0);

      dailyStats.push({
        date: date.toISOString(),
        registrations: dailyUsers,
        revenue: dailyRevenue
      });
    }

    return {
      totalUsers,
      premiumUsers,
      totalRevenue,
      totalViews,
      recentRegistrations,
      popularContent,
      dailyStats
    };
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
}; 