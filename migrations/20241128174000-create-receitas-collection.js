require("dotenv").config();
const mongoose = require("mongoose");
const ReceitaModel = require("../src/models/receitaModel");
const {
  connectToDatabase,
  disconnectToDatabase,
} = require("../src/utils/utils");

module.exports = {
  async up(db, client) {
    await connectToDatabase();

    await ReceitaModel.createCollection();

    await disconnectToDatabase();
  },

  async down(db, client) {
    await connectToDatabase();
    await mongoose.connection.dropCollection("receitas");
    await disconnectToDatabase();
  },
};
