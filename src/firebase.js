import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAsg0wy5IXSnOFRIHLsY6o21VVAf-TwG6M",
    authDomain: "fx-world-payout-manager-cb615.firebaseapp.com",
    projectId: "fx-world-payout-manager-cb615",
    storageBucket: "fx-world-payout-manager-cb615.appspot.com",
    messagingSenderId: "277510839152",
    appId: "1:277510839152:web:6e048c4454b1d26c480db5",
    measurementId: "G-GKXE6GJ292"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);
