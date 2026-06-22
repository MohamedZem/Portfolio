const express = require("express");
const router = express.Router();

const projectCtrl = require("../controllers/project.controller");

router.get("/", projectCtrl.getAllProjects);

module.exports = router;