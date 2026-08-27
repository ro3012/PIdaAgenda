const express = require("express");
const router = express.Router();
const areaController = require("../controllers/areaController");
const { authenticateToken, authorizePerfil } = require("../middlewares/authMiddleware");

router.get("/", authenticateToken, authorizePerfil("administrador"), areaController.getAll);
router.post("/", authenticateToken, authorizePerfil("administrador"), areaController.create);
router.put("/:id", authenticateToken, authorizePerfil("administrador"), areaController.update);
router.delete("/:id", authenticateToken, authorizePerfil("administrador"), areaController.delete);

module.exports = router;