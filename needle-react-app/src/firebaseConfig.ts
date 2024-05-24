// src/firebaseConfig.ts

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB_HGUpRSDTfIfcUGKV1BXcWsVMR32h_1A',
  authDomain: 'needle-react-app.firebaseapp.com',
  projectId: 'needle-react-app',
  storageBucket: 'needle-react-app.appspot.com',
  messagingSenderId: '237181638996',
  appId: '1:237181638996:web:b849266d6f83a26d4950c1',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
