
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACoSN1rCZCIibGLUlvMcU4FfQl-r5PPJU",
  authDomain: "houseautoproject.firebaseapp.com",
  projectId: "houseautoproject",
  storageBucket: "houseautoproject.firebasestorage.app",
  messagingSenderId: "1014071360382",
  appId: "1:1014071360382:web:8e3ffe9ec2d1855ec9112f",
  measurementId: "G-4YEY0SS0WB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export { auth };