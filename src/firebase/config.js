// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCugXaCe2z43a5JYmukvD-r2Oi9rpEvfhI",
  authDomain: "react-journal-app-eb2b6.firebaseapp.com",
  projectId: "react-journal-app-eb2b6",
  storageBucket: "react-journal-app-eb2b6.appspot.com",
  messagingSenderId: "741424785903",
  appId: "1:741424785903:web:4ac062bfd591a6ab616e1a",
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);

// Autenticamos la base de datos
export const FirebaseAuth = getAuth(FirebaseApp);

// Traemos la DB
export const FirebaseDB   = getFirestore(FirebaseApp);
