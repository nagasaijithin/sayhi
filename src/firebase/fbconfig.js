import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APP_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_APP_DATABASEURL,
  projectId: process.env.REACT_APP_FIREBASE_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_APP_MESSAGINGSENDRID,
  appId: process.env.REACT_APP_FIREBASE_APP_APPID,
};
firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;
