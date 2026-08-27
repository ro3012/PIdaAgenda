const express = require("express");
const router = express.Router();
const agendamentoController = require("../controllers/agendamentoController");
const slotsController = require("../controllers/slotsController");
const { authenticateToken, authorizePerfil } = require("../middlewares/authMiddleware");

router.get("/disponibilidade", slotsController.consultarDisponibilidade);
router.get("/usuario/:id/status/:statusId", authenticateToken, authorizePerfil("administrador"), agendamentoController.getByUsuarioAndStatus);
router.get("/profissional/:id/status/:statusId", authenticateToken, authorizePerfil("administrador"), agendamentoController.getByProfissionalAndStatus);
router.get("/usuario/:id", authenticateToken, authorizePerfil("administrador"), agendamentoController.getByUsuario);
router.get("/profissional/:id", authenticateToken, authorizePerfil("administrador"), agendamentoController.getByProfissional);
router.get("/status/:id", authenticateToken, authorizePerfil("administrador"), agendamentoController.getByStatus);
router.get("/", authenticateToken, authorizePerfil("administrador"), agendamentoController.getAll);
router.post("/", authenticateToken, authorizePerfil("administrador"), agendamentoController.create);
router.put("/:id", authenticateToken, authorizePerfil("administrador"), agendamentoController.update);
router.delete("/:id", authenticateToken, authorizePerfil("administrador"), agendamentoController.delete);

module.exports = router;