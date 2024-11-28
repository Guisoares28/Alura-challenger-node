const mongoose = require("mongoose");

const receitaSchema = new mongoose.Schema({
  descricao: {
    type: String,
    required: true,
  },
  valor: {
    type: Number,
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
});

const ReceitaModel = mongoose.model("receita", receitaSchema);

module.exports = ReceitaModel;
