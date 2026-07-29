import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// User's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1DvS-5YuI_lL44K9jCmbMbYwW_IFJ7MQ",
  authDomain: "llm-jailbreak-detection.firebaseapp.com",
  projectId: "llm-jailbreak-detection",
  storageBucket: "llm-jailbreak-detection.firebasestorage.app",
  messagingSenderId: "83086855665",
  appId: "1:83086855665:web:3812e84abefc36b4614850",
  measurementId: "G-8630GWQ41T"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Analytics standard initialization for browser environments
export let analytics = null;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
  } catch (err) {
    console.warn("Firebase Analytics could not be initialized:", err);
  }
}
