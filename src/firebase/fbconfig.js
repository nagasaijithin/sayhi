import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDUIt21G4XrkuRW7_93pla40whyU_nk3kQ",
  authDomain: "sayhi-dev-5fc85.firebaseapp.com",
  databaseURL: "https://sayhi-dev-5fc85.firebaseio.com",
  projectId: "sayhi-dev-5fc85",
  storageBucket: "sayhi-dev-5fc85.appspot.com",
  messagingSenderId: "819392958611",
  appId: "1:819392958611:web:30786c3f6ceced676fbd66",
};
firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;
