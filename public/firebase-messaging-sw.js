// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyA0hrIYjlauT_-SLj4QFMgN28RSnZqIdQY",
    authDomain: "cooking-notifications.firebaseapp.com",
    projectId: "cooking-notifications",
    storageBucket: "cooking-notifications.firebasestorage.app",
    messagingSenderId: "580898736074",
    appId: "1:580898736074:web:74a22381581f499d28b133",
    vapidKey: "BNrWm27Hi7Fki53eIoFXCxLKPgr1EWylkGtBowXlVM_3pWEus47ce-wwDXz5a3M1xm1CC6vtnp7NOHHxsE4A5TU",
    measurementId: "G-JBC8FYSD43"
  };

  
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png', // Customize with your logo
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});