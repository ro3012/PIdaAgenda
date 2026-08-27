const express = require("express");
const router = express.Router();
const profissionalController = require("../controllers/profissionalController");
const { authenticateToken, authorizePerfil } = require("../middlewares/authMiddleware");

router.get("/", authenticateToken, authorizePerfil("administrador"), profissionalController.getAll);
router.post("/", authenticateToken, authorizePerfil("administrador"), profissionalController.create);
router.put("/:id", authenticateToken, authorizePerfil("administrador"), profissionalController.update);
router.delete("/:id", authenticateToken, authorizePerfil("administrador"), profissionalController.delete);

module.exports = router;