
import { initializeApp } from "firebase/app";
import { getMessaging} from "firebase/messaging";




const firebaseConfig = {
  apiKey: "AIzaSyA0hrIYjlauT_-SLj4QFMgN28RSnZqIdQY",
  authDomain: "cooking-notifications.firebaseapp.com",
  projectId: "cooking-notifications",
  storageBucket: "cooking-notifications.firebasestorage.app",
  messagingSenderId: "580898736074",
  appId: "1:580898736074:web:74a22381581f499d28b133",
  vapidKey: "BNrWm27Hi7Fki53eIoFXCxLKPgr1EWylkGtBowXlVM_3pWEus47ce-wwDXz5a3M1xm1CC6vtnp7NOHHxsE4A5TU",

};


const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);



export { app, messaging  };