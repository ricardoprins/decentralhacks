import functions from "firebase-functions";
import admin from "firebase-admin";
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

firebase.initializeApp(firebaseConfig);
admin.initializeApp();
const app = require("express")();
const db = admin.firestore();

app.post("/signup", (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    username: req.body.username,
    role: 1,
    voted: false,
  };

  let token, userId;
  db.doc(`/users/${newUser.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res
          .status(400)
          .json({ username: "This username is already taken." });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((token) => {
      const userCredentials = {
        username: newUser.username,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
        token: (newUser.token = token),
      };
      return db.doc(`/users/${newUser.username}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email is already in use." });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
});

exports.api = functions.https.onRequest(app);
