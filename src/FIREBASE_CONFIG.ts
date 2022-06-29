import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyAJ0D47Li6zg15Vjja98nK_4uvZ9g3Y5ac",
  authDomain: "db-movie-app-d5a6d.firebaseapp.com",
  projectId: "db-movie-app-d5a6d",
  storageBucket: "db-movie-app-d5a6d.appspot.com",
  messagingSenderId: "565702762942",
  appId: "1:565702762942:web:9b6a9a5c53f9fcb542d9ef",
  measurementId: "G-6QMD3FXE8D"
};

if(!getApps().length) {
    initializeApp(firebaseConfig)
}

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)