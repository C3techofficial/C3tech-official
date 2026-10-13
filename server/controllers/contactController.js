const Contact = require("../models/Contact");
const {
  sendAdminNotificationEmail,
  sendConfirmationEmail,
} = require("../utils/emailService");

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

    res.status(201).json({
      success: true,
      message: adminEmailResult.sent
        ? "Message Sent Successfully"
        : "Message saved, but the admin email notification could not be sent",
      data: contact,
      emailSent: adminEmailResult.sent,
      adminEmailSent: adminEmailResult.sent,
      confirmationEmailSent: confirmationEmailResult.sent,
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