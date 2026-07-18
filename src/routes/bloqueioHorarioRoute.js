const express = require("express");
const router = express.Router();
const bloqueioHorarioController = require("../controllers/bloqueioHorarioController");

router.get("/", bloqueioHorarioController.getAll);
router.post("/", bloqueioHorarioController.create);
router.put("/:id", bloqueioHorarioController.update);
router.delete("/:id", bloqueioHorarioController.delete);

module.exports = router;