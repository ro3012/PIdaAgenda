const express = require("express");
const router = express.Router();
const horarioTrabalhoController = require("../controllers/horarioTrabalhoController");

router.get("/", horarioTrabalhoController.getAll);
router.post("/", horarioTrabalhoController.create);
router.put("/:id", horarioTrabalhoController.update);
router.delete("/:id", horarioTrabalhoController.delete);

module.exports = router;