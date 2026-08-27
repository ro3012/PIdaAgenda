const express = require("express");
const router = express.Router();
const horarioBloqueadoController = require("../controllers/horarioBloqueadoController");
const { authenticateToken, authorizePerfil } = require("../middlewares/authMiddleware");

router.get("/", authenticateToken, authorizePerfil("administrador"), horarioBloqueadoController.getAll);
router.post("/", authenticateToken, authorizePerfil("administrador"), horarioBloqueadoController.create);
router.put("/:id", authenticateToken, authorizePerfil("administrador"), horarioBloqueadoController.update);
router.delete("/:id", authenticateToken, authorizePerfil("administrador"), horarioBloqueadoController.delete);

module.exports = router;