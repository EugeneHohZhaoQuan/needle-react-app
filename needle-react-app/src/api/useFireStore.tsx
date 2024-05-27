// firestore.js
import { firestore } from '../firebaseConfig';
import {
  getFirestore,
  addDoc,
  doc,
  getDoc,
  setDoc,
  collection,
} from 'firebase/firestore';

const saveLike = async (username: string, breed: string, src: string) => {
  try {
    await addDoc(collection(firestore, 'likes'), {
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

export { saveLike, getFavoritedBreeds, saveFavoritedBreeds };
