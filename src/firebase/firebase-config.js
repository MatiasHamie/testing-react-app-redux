import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// const firebaseConfigTesting = {
//   apiKey: "AIzaSyDZZKcpWfoFo26sxrjfDwax3k6ObA_-i8Y",
//   authDomain: "react-app-cursos-2a8b4.firebaseapp.com",
//   databaseURL: "https://react-app-cursos-2a8b4.firebaseio.com",
//   projectId: "react-app-cursos-2a8b4",
//   storageBucket: "react-app-cursos-2a8b4.appspot.com",
//   messagingSenderId: "578285105231",
//   appId: "1:578285105231:web:65f941ed0c11c7d434ba3a",
// };

// if (process.env.NODE_ENV === "test") {
//   // testing
//   firebase.initializeApp(firebaseConfigTesting);
// } else {
//   // dev/prod
//   firebase.initializeApp(firebaseConfig);
// }

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
