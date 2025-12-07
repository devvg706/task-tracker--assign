const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;
const bcrypt = require("bcryptjs");
const { welcomeEmailTemplate } = require("../mailtemplates/welcomeEmailTemplate");
const mailSender = require("../utils/MailSender");


const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String, 
        required: true 
    },
    confirmPassword: {
        type: String 
    },
    token: { 
        type: String 
    },
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    image: {
        type: String
    },
  },
  {
    timestamps: true,
  }
);


// Send welcome email function
const sendWelcomeEmail = async (email, firstName) => {
  try {
    const htmlTemplate = welcomeEmailTemplate(email, firstName);
    const welcomeResponse = await mailSender(
      email,
      "Welcome Email From TaskTracker",
      htmlTemplate
    );
    console.log("WELCOME EMAIL RESPONSE:", welcomeResponse);
  } catch (error) {
    console.log("ERROR SENDING WELCOME EMAIL", error);
  }
};

// Post-save hook
userSchema.post("save", async function (doc) {
  try {
    console.log("User created:", doc);
    await sendWelcomeEmail(doc.email, doc.firstName);
  } catch (error) {
    console.log("ERROR IN WELCOME EMAIL AFTER USER CREATION", error);
  }
});


const User = models?.User || model("User", userSchema);

module.exports = User;
