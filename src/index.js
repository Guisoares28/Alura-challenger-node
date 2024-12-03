require("dotenv").config();
const connect_db = require("../src/config/db_config");
const express = require("express");
const mongoose = require("mongoose");
const receitaRoute = require("../src/routes/receitaRoute");
const despesaRoute = require("../src/routes/despesaRoute");

const app = express();

//middleware para converter respostas em json
app.use(express.json());

//middleware com informações sobre a requisição
app.use((req, res, next) => {
  console.log(
    "Requisição recebida com sucesso!",
    "Method:",
    req.method,
    " URL:",
    req.url
  );
  next();
});

app.use("/receitas", receitaRoute);
app.use("/despesas", despesaRoute);

connect_db().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Servidor escutando na porta ${process.env.PORT}`);
  });
});
