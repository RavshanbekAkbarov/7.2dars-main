// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBL8bhvKobjEQbGz5blmFp3EuSHBTYY8pc",
  authDomain: "task-manager-fc1db.firebaseapp.com",
  projectId: "task-manager-fc1db",
  storageBucket: "task-manager-fc1db.firebasestorage.app",
  messagingSenderId: "491419813725",
  appId: "1:491419813725:web:e025812023921675818ab4",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore();
