import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAk6IdMVWp_-Iqq2vcl_MxkZQzYDocwGDs",
  authDomain: "ticket-scanner-15179.firebaseapp.com",
  databaseURL: "https://ticket-scanner-15179-default-rtdb.firebaseio.com",
  projectId: "ticket-scanner-15179",
  storageBucket: "ticket-scanner-15179.firebasestorage.app",
  messagingSenderId: "1044113381877",
  appId: "1:1044113381877:web:23b5c96e1895d1721028bc"
};

const app = initializeApp(firebaseConfig);
console.log(app);
export const db = getDatabase(app);
console.log("db", db);
