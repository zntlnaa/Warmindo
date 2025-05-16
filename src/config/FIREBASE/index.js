// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpyjf35R96eigYzqP7j95goD-MBbPDt2c",
  authDomain: "warmindo-f03f8.firebaseapp.com",
  databaseURL: "https://warmindo-f03f8-default-rtdb.firebaseio.com",
  projectId: "warmindo-f03f8",
  storageBucket: "warmindo-f03f8.appspot.com",
  messagingSenderId: "226333496223",
  appId: "1:226333496223:web:37a130bc338aef1b5323aa"
};


const FIREBASE = initializeApp(firebaseConfig);
const database = getDatabase(FIREBASE);

export default {
  FIREBASE,
  database, // pastikan database adalah properti dari objek ini
};