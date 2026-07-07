const express = require("express");
const router = express.Router();
const profissionalController = require("../controllers/profissionalController");

router.get("/", profissionalController.getAll);
router.post("/", profissionalController.create);
router.put("/:id", profissionalController.update);
router.delete("/:id", profissionalController.delete);

module.exports = router;