import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyArYjOfzqCmeUNGbcedrv4DJlmHN7zhOzg",
    authDomain: "linkmania-495f8.firebaseapp.com",
    projectId: "linkmania-495f8",
    storageBucket: "linkmania-495f8.appspot.com",
    messagingSenderId: "1011274894161",
    appId: "1:1011274894161:web:062421549f671654c32170",
    measurementId: "G-VYXLBMNVRK"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();