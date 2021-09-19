import * as firebase from "firebase/app";
import "firebase/messaging";

// const initializedFirebaseApp = firebase.initializeApp({
//     messagingSenderId: "196176104641"
// });
var messaging = null;
try{
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBwKgxTC7gDFeUMaYNJY31mfTw0241DdO0",
    authDomain: "smooth-copilot-201708.firebaseapp.com",
    databaseURL: "https://smooth-copilot-201708.firebaseio.com",
    projectId: "smooth-copilot-201708",
    storageBucket: "smooth-copilot-201708.appspot.com",
    messagingSenderId: "196176104641",
    appId: "1:196176104641:web:1b355a8417ffc61dc1d840",
    measurementId: "G-Y4WEC4YV10"
  };
  // Initialize Firebase
  const initializedFirebaseApp = firebase.initializeApp(firebaseConfig);

  messaging = initializedFirebaseApp.messaging();

  messaging.usePublicVapidKey(
    "BAzPEXXila-EE69SVPSYfCXnKnlGsOMQ5vi63Sl62oZNggLuf0gZ8c_BosRU6eBdWbHrfhNPwpYA2nze6V-wz5g"
  );
}catch(err){
}


export { messaging };