// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";


// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZjBCRh7nHyfEX5R94vEArSr1_0MUIKbc",
    authDomain: "r-habbit.firebaseapp.com",
    databaseURL: "https://r-habbit-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "r-habbit",
    storageBucket: "r-habbit.appspot.com",
    messagingSenderId: "177087475513",
    appId: "1:177087475513:web:62e745b39b75295b0d42e8",
    measurementId: "G-B0Q29YE2ZJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

