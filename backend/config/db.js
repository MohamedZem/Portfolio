const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connexion à MongoDB réussie");
  } catch (error) {
    console.error("Impossible de se connecter à MongoDB");
    console.error(error);

    process.exit(1);
  }
};

module.exports = connectDB;