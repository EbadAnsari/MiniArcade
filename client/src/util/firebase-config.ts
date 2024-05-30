import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: "miniarcade-app.firebaseapp.com",
	projectId: "miniarcade-app",
	storageBucket: "miniarcade-app.appspot.com",
	messagingSenderId: "153062483300",
	appId: import.meta.env.VITE_FIREBASE_API_ID,
	measurementId: "G-3NKRGLGD7W",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Firebase Auth
export const auth = getAuth(app);

// Firebase cloud storage
export const firestore = getFirestore(app);
