const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");

// POST API
router.post("/", async (req, res) => {
  try {
    const newContact = new Contact(req.body);

    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Data Saved Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;