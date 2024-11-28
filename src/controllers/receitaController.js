const ReceitaModel = require("../models/receitaModel");
const moment = require("moment");

class ReceitaController {
  async createReceita(req, res) {
    try {
      const { descricao, valor, data } = req.body;

      const ano = moment(data).year();
      const mes = moment(data).month();

      const receitaExistente = await ReceitaModel.findOne({
        descricao,
        data: {
          $gte: moment({ year: ano, month: mes }).startOf("month").toDate(),
          $lt: moment({ year: ano, month: mes }).endOf("month").toDate(),
        },
      });

      if (receitaExistente) {
        return res.status(500).json({
          message: "Já existe uma conta criada com esta descrição neste Mês",
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
        res
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
        res.status(404).json({ message: "Receita não encontrada" });
      }
      res.status(200).json(receita);
    } catch (error) {
      res.status(400).json({
        message: "Não foi possível deletar a receita",
        error: error.message,
      });
    }
  }
}

module.exports = new ReceitaController();
