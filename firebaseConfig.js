// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNekARuvMlee_w2MhNh69xmTMFh3jCa6w",
  authDomain: "fbla24-410820.firebaseapp.com",
  projectId: "fbla24-410820",
  storageBucket: "fbla24-410820.appspot.com",
  messagingSenderId: "459354272716",
  appId: "1:459354272716:web:461fcaef7916c9e3fe2369",
  measurementId: "G-KP2PXZYEHG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);

export { auth, db, app };
