// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getEnvironments } from "../helpers";

// console.log(process.env)
// console.log(import.meta.env)
// console.log( env )
const {
VITE_APIKEY,
VITE_AUTHDOMAIN,
VITE_PROJECTID,
VITE_STORAGEBUCKET,
VITE_MESSAGINGSENDERID,
VITE_APPID,
} = getEnvironments();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Dev/Prod
// const firebaseConfig = {
  // apiKey: "AIzaSyCugXaCe2z43a5JYmukvD-r2Oi9rpEvfhI",
  // authDomain: "react-journal-app-eb2b6.firebaseapp.com",
  // projectId: "react-journal-app-eb2b6",
  // storageBucket: "react-journal-app-eb2b6.appspot.com",
  // messagingSenderId: "741424785903",
  // appId: "1:741424785903:web:4ac062bfd591a6ab616e1a",
// };



// Testing
// const firebaseConfig = {
//   apiKey: "AIzaSyDpPPhUvz1yzK0nxVKKNgSwbJbH5lBqt-Y",
//   authDomain: "react-journal-app-test-80c99.firebaseapp.com",
//   projectId: "react-journal-app-test-80c99",
//   storageBucket: "react-journal-app-test-80c99.appspot.com",
//   messagingSenderId: "696832611798",
//   appId: "1:696832611798:web:16c4b4341f3173bc778077"
// };

const firebaseConfig = {
    apiKey: VITE_APIKEY,
    authDomain: VITE_AUTHDOMAIN,
    projectId: VITE_PROJECTID,
    storageBucket: VITE_STORAGEBUCKET,
    messagingSenderId: VITE_MESSAGINGSENDERID,
    appId: VITE_APPID,
  };

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);

// Autenticamos la base de datos
export const FirebaseAuth = getAuth(FirebaseApp);

// Traemos la DB
export const FirebaseDB   = getFirestore(FirebaseApp);
