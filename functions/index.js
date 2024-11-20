const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Function to send daily notifications
exports.sendDailyNotification = functions.pubsub.schedule('every 24 hours').onRun(async (context) => {
  const today = new Date();               // Get today's date
  const dayOfWeek = today.getDay();       // Get day of the week (0 = Sunday, 1 = Monday, etc.)

  let message = "";
  
  // Send message based on the day of the week
  switch(dayOfWeek) {
    case 0: // Sunday
      message = "Today's meal: Aamlet, Kadhi chawal";
      break;
    case 1: // Monday
      message = "Today's meal: Pars Talela, Dal Bhat";
      break;
    case 2: // Tuesday
      message = "Today's meal: Upma, Pav Bhaji";
      break;
    case 3: // Wednesday
      message = "Today's meal: Biryani, Salad";
      break;
    case 4: // Thursday
      message = "Today's meal: Paneer Tikka, Roti";
      break;
    case 5: // Friday
      message = "Today's meal: Pizza, Garlic Bread";
      break;
    case 6: // Saturday
      message = "Today's meal: Masala Dosa, Chutney";
      break;
    default:
      message = "No meal plan available today";
      break;
  }

  // Prepare and send notification
  const messagePayload = {
    notification: {
      title: "Today's Cooking Plan",
      body: message,
    },
    topic: "cooking_notifications", // Sending to users subscribed to the 'cooking_notifications' topic
  };

  try {
    await admin.messaging().send(messagePayload);
    console.log("Notification sent for day: ", dayOfWeek);
  } catch (error) {
    console.error("Error sending notification: ", error);
  }
});
