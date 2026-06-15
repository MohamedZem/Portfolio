const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const contactCtrl = require("../controllers/contact.controller");

router.post("/", contactCtrl.createMessage);
router.get("/", auth, contactCtrl.getMessages);

module.exports = router;