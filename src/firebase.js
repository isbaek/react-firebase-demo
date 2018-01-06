import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyCVIM7zQ4RIcaT6HLOylzeiFfFqpR2WfEw",
  authDomain: "react-firebase-kg.firebaseapp.com",
  databaseURL: "https://react-firebase-kg.firebaseio.com",
  projectId: "react-firebase-kg",
  storageBucket: "react-firebase-kg.appspot.com",
  messagingSenderId: "432925627762"
};
const fire = firebase.initializeApp(config);

export default fire;
