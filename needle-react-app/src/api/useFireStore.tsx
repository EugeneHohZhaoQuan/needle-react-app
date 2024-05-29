// firestore.js
import { firestore } from '../firebaseConfig';
import {
  addDoc,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

const saveLike = async (username: string, breed: string, src: string) => {
  try {
    await addDoc(collection(firestore, 'liked_images'), {
      username,
      breed,
      src,
      likedAt: new Date(),
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

const getFavoritedBreeds = async (username: string) => {
  const docRef = doc(collection(firestore, 'users'), username);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().breeds || [];
  } else {
    return [];
  }
};

const saveFavoritedBreeds = async (username: string, breeds: string[]) => {
  const userRef = doc(collection(firestore, 'users'), username);
  await setDoc(userRef, { breeds });
};

const getUserLikes = async (username: string) => {
  try {
    const q = query(
      collection(firestore, 'liked_images'),
      where('username', '==', username),
    );
    const querySnapshot = await getDocs(q);

    const likes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return likes;
  } catch (e) {
    console.error('Error fetching documents: ', e);
    throw new Error('Error fetching likes');
  }
};

export { saveLike, getFavoritedBreeds, saveFavoritedBreeds, getUserLikes };
