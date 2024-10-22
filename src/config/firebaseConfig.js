import { initializeApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';  
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { getDatabase } from 'firebase/database';  

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyA3sQfals7ULbnHMXopHWh_IonSLn_K32U",
  authDomain: "ecommerce-app-6a9fd.firebaseapp.com",
  projectId: "ecommerce-app-6a9fd",
  storageBucket: "ecommerce-app-6a9fd.appspot.com",
  messagingSenderId: "383934127015",
  appId: "1:383934127015:web:58b2b22a06ce03ffe37482",
  measurementId: "G-BELW2BFZ0K",
  databaseURL: "https://ecommerce-app-6a9fd-default-rtdb.firebaseio.com"  
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),  
});

const db = getDatabase(app); 

export { auth, db };