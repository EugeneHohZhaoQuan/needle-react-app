// firestore.js
import { firestore } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

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

export { saveLike };
