const express = require("express");
const DespesaController = require("../controllers/despesaController");
const DespesaModel = require("../models/despesaModel");

const router = express.Router();

router.post("/", DespesaController.createDespesa);
router.get("/", DespesaController.buscarTodasAsDespesas);
router.get("/descricao", DespesaController.buscarDespesaPorDescricao);
router.get("/:id", DespesaController.buscarDespesaPorId);
router.delete("/:id", DespesaController.deletarDespesaPorId);
router.patch("/:id", DespesaController.atualizarDespesa);

module.exports = router;
