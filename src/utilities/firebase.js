import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBlHATrY22X0Mp7uRQSei2wbl4kiR7GtHY",
  authDomain: "vue-js-686f8.firebaseapp.com",
  projectId: "vue-js-686f8",
  storageBucket: "vue-js-686f8.appspot.com",
  messagingSenderId: "620978899834",
  appId: "1:620978899834:web:79a3234a3fe188351724c3",
  databaseURL: "https://vue-js-686f8-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
