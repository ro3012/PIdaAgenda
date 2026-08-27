const express = require("express");
const publicController = require("../controllers/publicController");
const router = express.Router();

router.get("/home", publicController.home);

module.exports = router;