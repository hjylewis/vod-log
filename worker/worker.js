var firebase = require("firebase");

firebase.initializeApp({
  serviceAccount: "cert/vod-log-cc3b0a499520.json",
  databaseURL: "https://vod-log.firebaseio.com/"
});
