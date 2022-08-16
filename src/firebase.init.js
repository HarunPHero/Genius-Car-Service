// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwRqOkFpIvl8YzzcQ7ZGf_9_yvcNK-FnA",

  authDomain: "genius-car-service-739.firebaseapp.com",

  projectId: "genius-car-service-739",

  storageBucket: "genius-car-service-739.appspot.com",

  messagingSenderId: "340358438268",

  appId: "1:340358438268:web:9063edc2c0015dfbead8f9",

  measurementId: "G-LR7JG9P9HZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
