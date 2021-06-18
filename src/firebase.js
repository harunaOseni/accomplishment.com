import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBYClRPo_icYsSJPUrKrfM9KE13mF9Pr7o",
  authDomain: "accomplishment-com.firebaseapp.com",
  projectId: "accomplishment-com",
  storageBucket: "accomplishment-com.appspot.com",
  messagingSenderId: "244986301435",
  appId: "1:244986301435:web:94797053b75b0c3216195e",
  measurementId: "G-TVSLRYL3BL",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
