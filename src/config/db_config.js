const mongoose = require("mongoose");

const connect_db = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DATABASE_ADMIN}:${process.env.DATABASE_PASSWORD}@aprendendomongodb.priqq.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority&appName=AprendendoMongoDb`
    );
    console.log("Conexão efetuada com sucesso!");
  } catch (error) {
    console.log("Falha de conexão com o banco de dados:", error.message);
  }
};

module.exports = connect_db;
