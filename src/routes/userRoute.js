const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken, authorizePerfil } = require("../middlewares/authMiddleware");

router.get("/", authenticateToken, authorizePerfil("administrador"), userController.getAll);
router.post("/", authenticateToken, authorizePerfil("administrador"), userController.create);
router.put("/:id", authenticateToken, authorizePerfil("administrador"), userController.update);
router.delete("/:id", authenticateToken, authorizePerfil("administrador"), userController.delete);

module.exports = router;