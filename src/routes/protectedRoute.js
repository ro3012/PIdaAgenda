const express = require("express");
const { authenticateToken, authorizePerfil } = require("../middlewares/authMiddleware");
const protectedController = require("../controllers/protectedController");

const router = express.Router();

router.get("/dashboard", authenticateToken, protectedController.dashboard);
router.get("/admin", authenticateToken, authorizePerfil("administrador"), protectedController.adminOnly);

module.exports = router;