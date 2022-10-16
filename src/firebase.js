// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwDB_VxY77ImbD0R0TQzFy0ZYyQLV4050",
  authDomain: "weekly-prophet.firebaseapp.com",
  projectId: "weekly-prophet",
  storageBucket: "weekly-prophet.appspot.com",
  messagingSenderId: "989193390772",
  appId: "1:989193390772:web:2326346d46c7b7899da5e1",
  measurementId: "G-7CTVFJCV6H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {app}


