import firebase from "firebase/app";
import "firebase/auth";

const config = require("./config").default;

const app = firebase.initializeApp({
  apiKey: config.base.api,
  authDomain: config.base.dom,
  databaseURL: config.base.db,
  projectId: config.base.project,
  storageBucket: config.base.storage,
  messagingSenderId: config.base.sender,
  appId: config.base.appid,
  measurementId: config.base.mid,
});

export default app;
