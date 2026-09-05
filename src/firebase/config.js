import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDczopU4JoRZWBcUbxa8TuuKfgq6JuKWtc",
  authDomain: "ardini-a79ea.firebaseapp.com",
  projectId: "ardini-a79ea",
  storageBucket: "ardini-a79ea.firebasestorage.app",
  messagingSenderId: "212508949597",
  appId: "1:212508949597:web:b4557b99e4c954f2fd61b4",
  measurementId: "G-GW3KKJLTF3",
};

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey);

const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;

export const auth = isFirebaseConfigured ? getAuth(app) : null;
export const db = isFirebaseConfigured ? getFirestore(app) : null;

export let analytics = null;
if (isFirebaseConfigured) {
  isSupported().then((supported) => {
    if (supported) analytics = getAnalytics(app);
  });
}

export default app;
