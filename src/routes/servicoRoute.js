const express = require("express");
const router = express.Router();
const servicoController = require("../controllers/servicoController");
const { authenticateToken, authorizePerfil } = require("../middlewares/authMiddleware");

router.get("/", authenticateToken, authorizePerfil("administrador"), servicoController.getAll);
router.get("/area/:area_id", authenticateToken, authorizePerfil("administrador"), servicoController.getServicosPorArea);
router.post("/", authenticateToken, authorizePerfil("administrador"), servicoController.create);
router.put("/:id", authenticateToken, authorizePerfil("administrador"), servicoController.update);
router.delete("/:id", authenticateToken, authorizePerfil("administrador"), servicoController.delete);

module.exports = router;