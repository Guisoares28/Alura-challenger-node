const express = require("express");
const receitaController = require("../controllers/receitaController");

const router = express.Router();

router.post("/", receitaController.createReceita);
router.get("/", receitaController.getAllReceitas);
router.get("/:id", receitaController.getReceitaForId);
router.delete("/:id", receitaController.deleteReceita);
router.patch("/:id", receitaController.atualizarReceita);

module.exports = router;
