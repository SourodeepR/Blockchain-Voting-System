import firebase from 'firebase/compat/app';

import { initializeApp } from "firebase/app"


const firebaseConfig = {
    apiKey: "AIzaSyBAlyVHcdinxLw7V-MBBWj6cqVXmw9-i4g",
    authDomain: "votify-c8168.firebaseapp.com",
    projectId: "votify-c8168",
    storageBucket: "votify-c8168.appspot.com",
    messagingSenderId: "730119311306",
    appId: "1:730119311306:web:026ad7d381883dd0174933",
    measurementId: "G-36E54XJMVW"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
