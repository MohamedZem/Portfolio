const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const projectRoutes = require("./routes/project.routes");
const contactRoutes = require("./routes/contact.routes");

const app = express();

app.use(
  cors({
    origin: [/^http:\/\/localhost:\d+$/,
    "https://portfolio-mohamed-zemouchi.onrender.com",
    "https://portfolio-11bx.onrender.com"
  ]
  }));

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Erreur interne du serveur",
  });
});

module.exports = app;