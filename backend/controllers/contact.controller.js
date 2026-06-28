const Contact = require("../models/Contact");
const { sendContactMail } = require("../services/mail");

exports.sendMessage = async (req, res) => {
  try {
    const { firstname, lastname, email, subject, message } = req.body;

    const contact = new Contact({
      firstname,
      lastname,
      email,
      subject,
      message,
      status: "pending",
      ipAddress: req.ip,
    });

    await contact.save();

    try {
      await sendContactMail({
        firstname,
        lastname,
        email,
        subject,
        message,
      });

      contact.status = "sent";
      contact.sentAt = new Date();
      await contact.save();

      return res.status(200).json({
        message: "Message envoyé avec succès.",
      });
    } catch (mailError) {
      console.error("Erreur email :", mailError);

      contact.status = "failed";
      await contact.save();

      return res.status(500).json({
        message: "Message sauvegardé, mais l'e-mail n'a pas pu être envoyé.",
      });
    }
  } catch (error) {
    console.error("Erreur contact :", error);

    return res.status(500).json({
      message: "Erreur lors du traitement du message.",
    });
  }
};