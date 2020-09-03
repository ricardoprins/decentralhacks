import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC_0R2vXCwioNTucSotjoJyH9JCSjuan0U",
  authDomain: "electrocrypt-dh.firebaseapp.com",
  databaseURL: "https://electrocrypt-dh.firebaseio.com",
  projectId: "electrocrypt-dh",
  storageBucket: "electrocrypt-dh.appspot.com",
  messagingSenderId: "549240550027",
  appId: "1:549240550027:web:1c06e07ba84b926dd5da8e",
};

const firebaseLogin = firebase.initializeApp(firebaseConfig);

export default firebaseLogin;
