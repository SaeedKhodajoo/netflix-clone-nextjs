// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMYoXRHSKRk7nBBlEJ-Oss_KaYqW-i6TI",
  authDomain: "netflix-clone-nextjs-f0379.firebaseapp.com",
  projectId: "netflix-clone-nextjs-f0379",
  storageBucket: "netflix-clone-nextjs-f0379.appspot.com",
  messagingSenderId: "549311737450",
  appId: "1:549311737450:web:de37ff1e96f1314c18a413"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }