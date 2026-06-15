const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const projectCtrl = require("../controllers/project.controller");

router.get("/", projectCtrl.getAllProjects);
router.get("/:id", projectCtrl.getOneProject);

router.post("/", auth, projectCtrl.createProject);
router.put("/:id", auth, projectCtrl.updateProject);
router.delete("/:id", auth, projectCtrl.deleteProject);

module.exports = router;