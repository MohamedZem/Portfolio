const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      email: req.body.email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({ message: "Utilisateur créé" });
  } catch (error) {
    res.status(400).json({ message: "Erreur création utilisateur" });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      userId: user._id,
      token
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};