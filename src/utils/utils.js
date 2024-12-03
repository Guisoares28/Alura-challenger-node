const mongoose = require("mongoose");
const ReceitaModel = require("../models/receitaModel");
const moment = require("moment");
const DespesaModel = require("../models/despesaModel");

let connection = null;

//Função que se conectar ao banco de dados, utilizado somente para criar migrations
async function connectToDatabase() {
  if (!connection) {
    connection = await mongoose.connect(
      `mongodb+srv://${process.env.DATABASE_ADMIN}:${process.env.DATABASE_PASSWORD}@aprendendomongodb.priqq.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority&appName=AprendendoMongoDb`
    );

    return connection;
  }
}

//Função que se desconectar ao banco de dados, utilizado somente para criar migrations
async function disconnectToDatabase() {
  if (connection) {
    await mongoose.disconnect();
    connection = null;
  }
}

//Está função verifica se já existe uma receita ou despesa cadastrada.
async function doubleReceita(descricao, data, modelo) {
  let dadoExistente = null;
  try {
    const ano = moment(data).year();
    const mes = moment(data).month();
    if (modelo === "receita") {
      dadoExistente = await ReceitaModel.findOne({
        descricao,
        data: {
          $gte: moment({ year: ano, month: mes }).startOf("month").toDate(),
          $lt: moment({ year: ano, month: mes }).endOf("month").toDate(),
        },
      });
    } else if (modelo === "despesa") {
      dadoExistente = await DespesaModel.findOne({
        descricao,
        data: {
          $gte: moment({ year: ano, month: mes }).startOf("month").toDate(),
          $lt: moment({ year: ano, month: mes }).endOf("month").toDate(),
        },
      });
    }
    return dadoExistente;
  } catch (error) {
    console.error("Erro ao verificar receita duplicada:", error.message);
    throw error;
  }
}

module.exports = {
  connectToDatabase,
  disconnectToDatabase,
  doubleReceita,
};
