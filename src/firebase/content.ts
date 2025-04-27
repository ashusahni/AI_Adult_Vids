import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  DocumentData 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from './config';

// Types
interface ContentItem {
  title: string;
  description: string;
  premium: boolean;
}

interface VideoItem extends ContentItem {
  duration: string;
  type: 'video';
}

interface ImageItem extends ContentItem {
  type: 'image';
}

// Add a new video to Firestore and Storage
export const addVideo = async (
  videoFile: File, 
  thumbnailFile: File, 
  videoData: VideoItem
) => {
  try {
    // Upload video to Storage
    const videoStorageRef = ref(storage, `videos/${Date.now()}_${videoFile.name}`);
    const videoSnapshot = await uploadBytes(videoStorageRef, videoFile);
    const videoUrl = await getDownloadURL(videoSnapshot.ref);

    // Upload thumbnail to Storage
    const thumbnailStorageRef = ref(storage, `thumbnails/${Date.now()}_${thumbnailFile.name}`);
    const thumbnailSnapshot = await uploadBytes(thumbnailStorageRef, thumbnailFile);
    const thumbnailUrl = await getDownloadURL(thumbnailSnapshot.ref);

    // Save metadata to Firestore
    const videoDocRef = await addDoc(collection(db, 'videos'), {
      ...videoData,
      url: videoUrl,
      thumbnail: thumbnailUrl,
      views: 0,
      uploadDate: new Date().toISOString(),
      videoStoragePath: videoStorageRef.fullPath,
      thumbnailStoragePath: thumbnailStorageRef.fullPath
    });

    return {
      id: videoDocRef.id,
      ...videoData,
      url: videoUrl,
      thumbnail: thumbnailUrl
    };
  } catch (error) {
    console.error('Error adding video:', error);
    throw error;
  }
};

// Add a new image to Firestore and Storage
export const addImage = async (
  imageFile: File, 
  imageData: ImageItem
) => {
  try {
    // Upload image to Storage
    const imageStorageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);
    const imageSnapshot = await uploadBytes(imageStorageRef, imageFile);
    const imageUrl = await getDownloadURL(imageSnapshot.ref);

    // Save metadata to Firestore
    const imageDocRef = await addDoc(collection(db, 'images'), {
      ...imageData,
      url: imageUrl,
      uploadDate: new Date().toISOString(),
      imageStoragePath: imageStorageRef.fullPath
    });

    return {
      id: imageDocRef.id,
      ...imageData,
      url: imageUrl
    };
  } catch (error) {
    console.error('Error adding image:', error);
    throw error;
  }
};

// Get all videos
export const getVideos = async () => {
  try {
    const q = query(
      collection(db, 'videos'),
      orderBy('uploadDate', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting videos:', error);
    throw error;
  }
};

// Get all images
export const getImages = async () => {
  try {
    const q = query(
      collection(db, 'images'),
      orderBy('uploadDate', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting images:', error);
    throw error;
  }
};

// Get content by ID (video or image)
export const getContentById = async (contentType: 'videos' | 'images', id: string) => {
  try {
    const docRef = doc(db, contentType, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      console.error('Content not found');
      return null;
    }
  } catch (error) {
    console.error(`Error getting ${contentType} item:`, error);
    throw error;
  }
};

// Update video views count
export const updateVideoViews = async (videoId: string) => {
  try {
    const videoRef = doc(db, 'videos', videoId);
    const videoDoc = await getDoc(videoRef);
    
    if (videoDoc.exists()) {
      const currentViews = videoDoc.data().views || 0;
      await updateDoc(videoRef, {
        views: currentViews + 1
      });
    }
  } catch (error) {
    console.error('Error updating views:', error);
    throw error;
  }
};

// Delete video
export const deleteVideo = async (videoId: string) => {
  try {
    // Get video data first to access storage paths
    const videoRef = doc(db, 'videos', videoId);
    const videoDoc = await getDoc(videoRef);
    
    if (videoDoc.exists()) {
      const { videoStoragePath, thumbnailStoragePath } = videoDoc.data();
      
      // Delete from Storage
      if (videoStoragePath) {
        await deleteObject(ref(storage, videoStoragePath));
      }
      
      if (thumbnailStoragePath) {
        await deleteObject(ref(storage, thumbnailStoragePath));
      }
      
      // Delete from Firestore
      await deleteDoc(videoRef);
      return true;
    } else {
      console.error('Video not found');
      return false;
    }
  } catch (error) {
    console.error('Error deleting video:', error);
    throw error;
  }
};

// Delete image
export const deleteImage = async (imageId: string) => {
  try {
    // Get image data first to access storage path
    const imageRef = doc(db, 'images', imageId);
    const imageDoc = await getDoc(imageRef);
    
    if (imageDoc.exists()) {
      const { imageStoragePath } = imageDoc.data();
      
      // Delete from Storage
      if (imageStoragePath) {
        await deleteObject(ref(storage, imageStoragePath));
      }
      
      // Delete from Firestore
      await deleteDoc(imageRef);
      return true;
    } else {
      console.error('Image not found');
      return false;
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
}; 