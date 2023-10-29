import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD5KQXe0QR3BXo5HerK76xvQnmhJS8JzHU",
  authDomain: "shafla-8586b.firebaseapp.com",
  projectId: "shafla-8586b",
  storageBucket: "shafla-8586b.appspot.com",
  messagingSenderId: "423714530497",
  appId: "1:423714530497:web:90525b71e9ac3a6708a040"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);