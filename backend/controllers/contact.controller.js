const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

exports.createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Contact({
      name,
      email,
      message
    });

    await newMessage.save();

    const transporterOptions = process.env.EMAIL_HOST
      ? {
          host: process.env.EMAIL_HOST,
          port: Number(process.env.EMAIL_PORT) || 465,
          secure: process.env.EMAIL_SECURE === "true",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        }
      : {
          service: process.env.EMAIL_SERVICE || "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        };

    const transporter = nodemailer.createTransport(transporterOptions);

    // Vérifier la connexion SMTP
    await transporter.verify();
    console.log("✓ Connexion SMTP vérifiée");

    const mailTo = process.env.EMAIL_TO || process.env.EMAIL_USER;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: mailTo,
      subject: "Nouveau message depuis le portfolio",
      html: `
        <h2>Nouveau message reçu</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
      `,
      text: `Nouveau message reçu\nNom : ${name}\nEmail : ${email}\nMessage : ${message}`
    });

    console.log("✓ Email envoyé avec succès vers", mailTo);

    res.status(201).json({
      message: "Message enregistré et e-mail envoyé"
    });
  } catch (error) {
    console.error("❌ Erreur contact :", error.message || error);
    res.status(500).json({
      message: "Erreur lors de l'envoi du message: " + (error.message || "erreur inconnue")
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};