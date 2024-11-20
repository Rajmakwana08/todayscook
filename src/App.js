// src/App.js
import React, { useState, useEffect } from "react"; // Import React and useState Hook
import "./App.css"; // Import CSS file
import { getToken, onMessage } from "firebase/messaging"; // Removed unused import of getMessaging
import { messaging } from "./firebase-config"; // Correctly import named exports

// Request permission for notifications
const requestPermission = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: "BNrWm27Hi7Fki53eIoFXCxLKPgr1EWylkGtBowXlVM_3pWEus47ce-wwDXz5a3M1xm1CC6vtnp7NOHHxsE4A5TU",
    });

    if (token) {
      console.log("User FCM Token:", token);
      alert("Notifications are enabled!");
    } else {
      console.log("No registration token available.");
    }
  } catch (error) {
    console.error("Error fetching token: ", error);
  }
};

// Main App Component
const App = () => {
  const [selectedDay, setSelectedDay] = useState("સોમવાર"); // Default day is Monday
  const [notifications, setNotifications] = useState([]); // Store notifications

  // Gujarati meal schedule
  const cookingSchedule = {
    "સોમવાર": {
      morning: "પારસ તળેલા",
      afternoon: "દાળ ભાત",
      night: "પિઝ્ઝા",
    },
    "મંગળવાર": {
      morning: "ઉપમા",
      afternoon: "પાવ ભાજી",
      night: "દોસા",
    },
    "બુધવાર": {
      morning: "ખીચુ",
      afternoon: "મસાલા ખિચડી",
      night: "પંજાબી થાળી",
    },
    "ગુરુવાર": {
      morning: "ધોકળા",
      afternoon: "પૂરી શાક",
      night: "શાકભાજી હાંડી",
    },
    "શુક્રવાર": {
      morning: "મઉંઠ",
      afternoon: "ખીચડી",
      night: "મકાઈ રોટલો",
    },
    "શનિવાર": {
      morning: "કોચૂરી",
      afternoon: "રજવાડી શાક",
      night: "ઠેપલાં",
    },
    "રવિવાર": {
      morning: "આમલેટ",
      afternoon: "કઢી ચાવલ",
      night: "શાક તવા",
    },
  };

  // Fetch today's meal plan when the component mounts
  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const dayNames = [
      "રવિવાર", // Sunday
      "સોમવાર", // Monday
      "મંગળવાર", // Tuesday
      "બુધવાર", // Wednesday
      "ગુરુવાર", // Thursday
      "શુક્રવાર", // Friday
      "શનિવાર", // Saturday
    ];

    setSelectedDay(dayNames[dayOfWeek]); // Set default day based on the current day
  }, []);

  // Handle foreground notifications
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Message received: ", payload);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        payload.notification,
      ]);
    });

    return unsubscribe; // Cleanup the listener when component unmounts
  }, []);

  return (
    <div className="App">
      <header>
        <h1>આજનું ભોજન પ્લાન</h1>
        <button onClick={requestPermission}>Enable Notifications</button>
      </header>

      <div className="day-selector">
        {Object.keys(cookingSchedule).map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={selectedDay === day ? "active" : ""}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="schedule">
        <h2>{selectedDay}</h2>
        <div className="meal-card">
          <h3>સવારે:</h3>
          <p>{cookingSchedule[selectedDay].morning}</p>
        </div>
        <div className="meal-card">
          <h3>બપોરે:</h3>
          <p>{cookingSchedule[selectedDay].afternoon}</p>
        </div>
        <div className="meal-card">
          <h3>રાત્રે:</h3>
          <p>{cookingSchedule[selectedDay].night}</p>
        </div>
      </div>

      {/* Render notifications in the UI */}
      <div className="notifications">
        {notifications.length > 0 ? (
          notifications.map((notif, index) => (
            <div key={index} className="notification-card">
              <h3>{notif.title}</h3>
              <p>{notif.body}</p>
            </div>
          ))
        ) : (
          <p>No new notifications</p>
        )}
      </div>
    </div>
  );
};

export default App;
