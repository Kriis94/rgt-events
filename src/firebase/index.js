import firebase from 'firebase/app';
import 'firebase/storage';

  var config = {
    apiKey: "AIzaSyAyn5hZ5KNdxF9rGdFlaMjGvV6FgqfEtJM",
    authDomain: "events-c9c06.firebaseapp.com",
    databaseURL: "https://events-c9c06.firebaseio.com",
    projectId: "events-c9c06",
    storageBucket: "events-c9c06.appspot.com",
    messagingSenderId: "154820938957"
  };

  firebase.initializeApp(config);

  const storage = firebase.storage();

  export {
      storage, firebase as default
  }
