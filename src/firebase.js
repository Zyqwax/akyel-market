import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDgEvXDpJizw9NArvBPn20WeIeTED-05kI",
  authDomain: "akyel-market.firebaseapp.com",
  projectId: "akyel-market",
  storageBucket: "akyel-market.appspot.com",
  messagingSenderId: "741663136127",
  appId: "1:741663136127:web:0a86ea7f1e26d9667da24a",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
