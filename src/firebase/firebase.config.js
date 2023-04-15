// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCH_KqR4K4R9-B2wrmta_qGwISK5PlsNFM",
  authDomain: "sunglass-auth.firebaseapp.com",
  projectId: "sunglass-auth",
  storageBucket: "sunglass-auth.appspot.com",
  messagingSenderId: "740406063226",
  appId: "1:740406063226:web:55ae9075d94bf9c2254bc3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
