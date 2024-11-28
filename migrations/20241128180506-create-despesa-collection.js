const {
  connectToDatabase,
  disconnectToDatabase,
} = require("../src/utils/utils");
const DespesaModel = require("../src/models/despesaModel");
const mongoose = require("mongoose");

module.exports = {
  async up(db, client) {
    await connectToDatabase();

    await DespesaModel.createCollection();

    await disconnectToDatabase();
  },

  async down(db, client) {
    await connectToDatabase();
    await mongoose.connection.dropCollection("receitas");
    await disconnectToDatabase();
  },
};
