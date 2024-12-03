const DespesaModel = require("../models/despesaModel");
const moment = require("moment");
const { doubleReceita } = require("../utils/utils");
const { readSync } = require("fs");

class DespesaController {
  async createDespesa(req, res) {
    try {
      const { descricao, valor, data } = req.body;
      const despesa_existente = await doubleReceita(descricao, data, "despesa");
      if (despesa_existente) {
        return res.status(400).json({
          message:
            "Já existe uma despesa cadastrada com está descrição neste Mês",
        });
      }
      const novaDespesa = new DespesaModel({
        descricao,
        valor,
        data,
      });
      await novaDespesa.save();
      return res.status(201).json(novaDespesa);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao criar a receita", error: error.message });
    }
  }

  async buscarTodasAsDespesas(req, res) {
    try {
      const despesas = await DespesaModel.find({});
      return res.status(200).json(despesas);
    } catch (error) {
      return res.status(400).json({
        message: "Não foi possível buscar as despesas",
        error: error.message,
      });
    }
  }

  async buscarDespesaPorId(req, res) {
    const { id } = req.params;
    try {
      const despesa = await DespesaModel.findById(id);
      if (!despesa) {
        return res.status(404).json({ message: "Despesa não encontrada" });
      }
      return res.status(200).json(despesa);
    } catch (error) {
      return res.status(500).json({
        message: "Ocorreu um erro ao buscar a receita",
        error: error.message,
      });
    }
  }

  async deletarDespesaPorId(req, res) {
    const { id } = req.params;
    try {
      const despesa = await DespesaModel.findByIdAndDelete(id);
      if (!despesa) {
        return res.status(404).json({ message: "Despesa não encontrada" });
      }
      return res.status(200).json(despesa);
    } catch (error) {
      res.status(500).json({
        message: "Ocorreu um erro ao deletar Despesa",
        error: error.message,
      });
    }
  }
  async atualizarDespesa(req, res) {
    let despesa_atualizada = null;
    const { id } = req.params;
    try {
      const despesa = await DespesaModel.findById(id);
      if (!despesa) {
        return res
          .status(400)
          .json({ message: "Despesa não encontrada com este Id" });
      }
      const { descricao, valor, data } = req.body;
      if (descricao && !data) {
        const despesa_existente = await doubleReceita(
          descricao,
          despesa.data,
          "despesa"
        );
        if (despesa_existente) {
          return res.status(400).json({
            message: "Já existe uma despesa com está descrição para este Mês",
          });
        }
        despesa_atualizada = await DespesaModel.findByIdAndUpdate(
          id,
          req.body,
          { new: true }
        );
        return res.status(200).json(despesa_atualizada);
      }
      despesa_atualizada = await DespesaModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json(despesa_atualizada);
    } catch (error) {
      return res.status(500).json({
        message: "ocorreu um erro ao atualizar",
        error: error.message,
      });
    }
  }

  async buscarDespesaPorDescricao(req, res) {
    const { descricao } = req.query;
    try {
      const despesa = await DespesaModel.findOne({ descricao });
      if (!despesa) {
        return res.status(404).json({ message: "Despesa não encontrada" });
      }
      return res.status(200).json(despesa);
    } catch (error) {
      return res.status(500).json({
        message: "Ocorreu algum erro ao buscar a despesa",
        error: error.message,
      });
    }
  }
}

module.exports = new DespesaController();
