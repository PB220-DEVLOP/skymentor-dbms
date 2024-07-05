import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const API_KEY = import.meta.env.VITE_Firebase_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "skymentor-dbms.firebaseapp.com",
  projectId: "skymentor-dbms",
  storageBucket: "skymentor-dbms.appspot.com",
  messagingSenderId: "435427333972",
  appId: "1:435427333972:web:fff1d4dfe92ef0c890dac1",
  measurementId: "G-6VLHN9V4B6"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}
const auth = getAuth(app);
const fireDb = getFirestore(app);
const storage = getStorage(app);

export { app, auth, fireDb, storage };
