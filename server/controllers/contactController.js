const Contact = require("../models/Contact");
const {
  sendAdminNotificationEmail,
  sendConfirmationEmail,
} = require("../utils/emailService");

const sendContactEmails = async (payload) => {
  const [adminEmailResult, confirmationEmailResult] = await Promise.all([
    sendAdminNotificationEmail(payload),
    sendConfirmationEmail({
      name: payload.name,
      email: payload.email,
      service: payload.service,
      budget: payload.budget,
      message: payload.message,
    }),
  ]);

  if (!adminEmailResult.sent) {
    console.error("Admin notification email was not sent:", adminEmailResult.reason);
  }

  if (!confirmationEmailResult.sent) {
    console.error("Contact confirmation email was not sent:", confirmationEmailResult.reason);
  }
};

const createContact = async (req, res) => {
  try {
    const payload = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      service: req.body.service,
      budget: req.body.budget,
      message: req.body.message,
    };

    const contact = await Contact.create(payload);

    res.status(201).json({
      success: true,
      message: "Message received successfully",
      data: contact,
    });

    sendContactEmails(payload).catch((error) => {
      console.error("Contact notification emails could not be sent:", error);
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createContact,
};