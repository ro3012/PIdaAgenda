const express = require("express");
const router = express.Router();
const horarioTrabalhoController = require("../controllers/horarioTrabalhoController");
const { authenticateToken, authorizePerfil } = require("../middlewares/authMiddleware");

router.get("/", authenticateToken, authorizePerfil("administrador"), horarioTrabalhoController.getAll);
router.post("/", authenticateToken, authorizePerfil("administrador"), horarioTrabalhoController.create);
router.put("/:id", authenticateToken, authorizePerfil("administrador"), horarioTrabalhoController.update);
router.delete("/:id", authenticateToken, authorizePerfil("administrador"), horarioTrabalhoController.delete);

module.exports = router;