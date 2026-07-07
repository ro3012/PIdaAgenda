const express = require("express");
const serverController = require("../controllers/serverController");

const router = express.Router();

router.get("/", serverController.home);

module.exports = router;