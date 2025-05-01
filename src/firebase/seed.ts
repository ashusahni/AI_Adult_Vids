import { 
  collection, 
  addDoc, 
  Timestamp,
  writeBatch,
  doc,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import { db } from './config';

// Sample data for seeding
const sampleUsers = [
  {
    username: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    isSubscribed: true,
    subscriptionTier: 'Premium',
    createdAt: Timestamp.fromDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)), // 7 days ago
  },
  {
    username: 'Jane Smith',
    email: 'jane@example.com',
    status: 'active',
    isSubscribed: false,
    subscriptionTier: 'Free',
    createdAt: Timestamp.fromDate(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)), // 5 days ago
  },
  {
    username: 'Mike Johnson',
    email: 'mike@example.com',
    status: 'suspended',
    isSubscribed: false,
    subscriptionTier: 'Free',
    createdAt: Timestamp.fromDate(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)), // 3 days ago
  }
];

const samplePlans = [
  {
    name: 'Basic',
    description: 'Access to basic content',
    price: 9.99,
    duration: 1,
    features: [
      'Access to basic content',
      'HD streaming',
      'No ads'
    ],
    isActive: true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  },
  {
    name: 'Premium',
    description: 'Full access to all content',
    price: 19.99,
    duration: 1,
    features: [
      'Access to all content',
      '4K streaming',
      'No ads',
      'Offline downloads',
      'Priority support'
    ],
    isActive: true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now()
  }
];

const sampleContent = [
  {
    title: 'Sample Video 1',
    description: 'This is a sample video',
    type: 'video',
    url: 'https://example.com/video1.mp4',
    thumbnail: 'https://example.com/thumbnail1.jpg',
    duration: '10:00',
    premium: false,
    views: 150,
    likes: 45,
    uploadDate: Timestamp.fromDate(new Date(Date.now() - 6 * 24 * 60 * 60 * 1000))
  },
  {
    title: 'Premium Video',
    description: 'This is a premium video',
    type: 'video',
    url: 'https://example.com/video2.mp4',
    thumbnail: 'https://example.com/thumbnail2.jpg',
    duration: '15:00',
    premium: true,
    views: 300,
    likes: 120,
    uploadDate: Timestamp.fromDate(new Date(Date.now() - 4 * 24 * 60 * 60 * 1000))
  }
];

const samplePayments = [
  {
    userId: 'user1',
    amount: 19.99,
    status: 'completed',
    planId: 'premium',
    createdAt: Timestamp.fromDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
  },
  {
    userId: 'user2',
    amount: 9.99,
    status: 'completed',
    planId: 'basic',
    createdAt: Timestamp.fromDate(new Date(Date.now() - 5 * 24 * 60 * 60 * 1000))
  }
];

// Function to seed the database
export const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    const batch = writeBatch(db);

    // Add users
    console.log('Seeding users...');
    for (const user of sampleUsers) {
      const userRef = doc(collection(db, 'users'));
      batch.set(userRef, user);
    }

    // Add subscription plans
    console.log('Seeding subscription plans...');
    for (const plan of samplePlans) {
      const planRef = doc(collection(db, 'subscriptionPlans'));
      batch.set(planRef, plan);
    }

    // Add content
    console.log('Seeding content...');
    for (const content of sampleContent) {
      const contentRef = doc(collection(db, 'videos'));
      batch.set(contentRef, content);
    }

    // Add payments
    console.log('Seeding payments...');
    for (const payment of samplePayments) {
      const paymentRef = doc(collection(db, 'payments'));
      batch.set(paymentRef, payment);
    }

    // Commit the batch
    await batch.commit();
    console.log('Database seeded successfully');
    return true;
  } catch (error) {
    console.error('Error seeding database:', error);
    return false;
  }
};

// Function to check if database needs seeding
export const checkAndSeedDatabase = async () => {
  try {
    console.log('Checking if database needs seeding...');
    
    // Check if users collection is empty
    const usersRef = collection(db, 'users');
    const usersQuery = query(usersRef, where('status', '!=', 'deleted'));
    const usersSnapshot = await getDocs(usersQuery);
    
    if (usersSnapshot.empty) {
      console.log('No active users found, starting seeding process...');
      return await seedDatabase();
    }
    
    console.log('Database already has data, skipping seeding');
    return false;
  } catch (error) {
    console.error('Error checking database:', error);
    return false;
  }
}; 