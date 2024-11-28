require("dotenv").config();
const connect_db = require("../src/config/db_config");
const express = require("express");
const mongoose = require("mongoose");
const receitaRoute = require("../src/routes/receitaRoute");

const app = express();

//middleware para converter respostas em json
app.use(express.json());

app.use("/receitas", receitaRoute);

connect_db().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Servidor escutando na porta ${process.env.PORT}`);
  });
});
