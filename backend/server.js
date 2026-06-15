const app = require("./app");
require("dotenv").config();
const connectDB = require("./config/db");

const PORT = process.env.PORT || 4000;

connectDB();

app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});