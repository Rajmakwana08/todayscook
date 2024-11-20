const admin = require("firebase-admin");
const schedule = require("node-schedule");
const path = require("path");

// Initialize Firebase Admin SDK
const serviceAccount = path.join(__dirname, "firebase-admin.json");
admin.initializeApp({
  credential: admin.credential.cert(require(serviceAccount)),
});

// Function to send notifications
const sendNotifications = async () => {
  const today = new Date().getDay();
  const messages = [
    "Today's meal: Aamlet, Kadhi chawal",
    "Today's meal: Pars Talela, Dal Bhat",
    "Today's meal: Upma, Pav Bhaji",
    "Today's meal: Biryani, Salad",
    "Today's meal: Paneer Tikka, Roti",
    "Today's meal: Pizza, Garlic Bread",
    "Today's meal: Masala Dosa, Chutney",
  ];

  const message = messages[today];

  const payload = {
    notification: {
      title: "Today's Cooking Plan",
      body: message,
    },
    topic: "cooking_notifications",
  };

  try {
    await admin.messaging().send(payload);
    console.log(`Notification sent successfully: ${message}`);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

// Schedule the notification at 9:00 AM every day
schedule.scheduleJob("0 9 * * *", sendNotifications);

console.log("Notification scheduler is running...");
