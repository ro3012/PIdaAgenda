const express = require("express");
const router = express.Router();
const statusAgendamentoController = require("../controllers/statusAgendamentoController");
const { authenticateToken, authorizePerfil } = require("../middlewares/authMiddleware");

router.get("/", authenticateToken, authorizePerfil("administrador"), statusAgendamentoController.getAll);
router.get("/:id", authenticateToken, authorizePerfil("administrador"), statusAgendamentoController.getStatusAgendamentoPorId);
router.post("/", authenticateToken, authorizePerfil("administrador"), statusAgendamentoController.create);
router.put("/:id", authenticateToken, authorizePerfil("administrador"), statusAgendamentoController.update);
router.delete("/:id", authenticateToken, authorizePerfil("administrador"), statusAgendamentoController.delete);

module.exports = router;