import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB4LAcKNrniISycIds6oW7M-L0pwWLpYbo",
  authDomain: "shafla.firebaseapp.com",
  projectId: "shafla",
  storageBucket: "shafla.appspot.com",
  messagingSenderId: "658018532875",
  appId: "1:658018532875:web:7299557412f7f61ac2510e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);