const mongoose = require("mongoose");

const despesaSchema = new mongoose.Schema({
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

const DespesaModel = mongoose.model("despesa", despesaSchema);

module.exports = DespesaModel;
