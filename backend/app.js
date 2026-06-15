const express = require("express");
const cors = require("cors");
require("dotenv").config();

const projectRoutes = require("./routes/project.routes");
const authRoutes = require("./routes/auth.routes");
const contactRoutes = require("./routes/contact.routes");

const app = express();

app.use(cors({
  origin: function (origin, callback) {
    // Accepter les requêtes depuis localhost sur n'importe quel port en développement
    if (!origin || origin.match(/^http:\/\/localhost:\d+$/)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  }
}));

app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

module.exports = app;