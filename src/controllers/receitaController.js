const ReceitaModel = require("../models/receitaModel");
const moment = require("moment");
const { doubleReceita } = require("../utils/utils");

class ReceitaController {
  async createReceita(req, res) {
    try {
      const { descricao, valor, data } = req.body;
      const receita_existente = await doubleReceita(descricao, data, "receita");
      if (receita_existente != null) {
        return res.status(400).json({
          message:
            "Já existe uma receita cadastrada com está descrição neste Mês",
        });
      }
      const novaReceita = new ReceitaModel({
        descricao,
        valor,
        data,
      });
      await novaReceita.save();
      res.status(201).json(novaReceita);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao criar a receita", error: error.message });
    }
  }

  async getAllReceitas(req, res) {
    try {
      const receitas = await ReceitaModel.find({});
      res.status(200).json(receitas);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar receitas", error: error.message });
    }
  }

  async getReceitaForId(req, res) {
    const { id } = req.params;
    try {
      const receita = await ReceitaModel.findById(id);
      if (!receita) {
        return res
          .status(404)
          .json({ message: "Nenhuma receita foi encontrada por esse id" });
      }
      res.status(200).json(receita);
    } catch (error) {
      res.status(400).json({
        message: "Não foi possível encontrar a receita",
        error: error.message,
      });
    }
  }

  async deleteReceita(req, res) {
    const { id } = req.params;
    try {
      const receita = await ReceitaModel.findByIdAndDelete(id);
      if (!receita) {
        return res.status(404).json({ message: "Receita não encontrada" });
      }
      res.status(200).json(receita);
    } catch (error) {
      res.status(400).json({
        message: "Não foi possível deletar a receita",
        error: error.message,
      });
    }
  }

  async atualizarReceita(req, res) {
    let receita_atualizada = null;
    const { id } = req.params;
    try {
      const despesa = await ReceitaModel.findById(id);
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
          "receita"
        );
        if (despesa_existente) {
          return res.status(400).json({
            message: "Já existe uma despesa com está descrição para este Mês",
          });
        }
        receita_atualizada = await ReceitaModel.findByIdAndUpdate(
          id,
          req.body,
          { new: true }
        );
        return res.status(200).json(receita_atualizada);
      }
      receita_atualizada = await ReceitaModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).json(receita_atualizada);
    } catch (error) {
      return res.status(500).json({
        message: "ocorreu um erro ao atualizar",
        error: error.message,
      });
    }
  }
}

module.exports = new ReceitaController();
