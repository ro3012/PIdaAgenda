const express = require("express");
const router = express.Router();
const relatorioController = require("../controllers/relatorioController");
const { authenticateToken, authorizePerfil } = require("../middlewares/authMiddleware");

router.get("/totalAgendamentos", authenticateToken, authorizePerfil("administrador"), relatorioController.getTotalAgendamentos);
router.get("/servicosMaisSolicitados", authenticateToken, authorizePerfil("administrador"), relatorioController.getServicosMaisSolicitados);
router.get("/profissionaisMaisRequisitados", authenticateToken, authorizePerfil("administrador"), relatorioController.getProfissionaisMaisRequisitados);
router.get("/", authenticateToken, authorizePerfil("administrador"), relatorioController.getRelatorios);

module.exports = router;