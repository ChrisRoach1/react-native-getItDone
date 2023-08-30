import { initializeApp } from "firebase/app";
import { initializeAuth, inMemoryPersistence } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_APIKEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTHDOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECTID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_SENDERID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APPID
  };

export const app = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(app);

export const FIREBASE_AUTH = initializeAuth(app, {
    persistence:inMemoryPersistence
  });