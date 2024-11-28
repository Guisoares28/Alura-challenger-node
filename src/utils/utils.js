const mongoose = require("mongoose");

let connection = null;

async function connectToDatabase() {
  if (!connection) {
    connection = await mongoose.connect(
      `mongodb+srv://${process.env.DATABASE_ADMIN}:${process.env.DATABASE_PASSWORD}@aprendendomongodb.priqq.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority&appName=AprendendoMongoDb`
    );

    return connection;
  }
}

async function disconnectToDatabase() {
  if (connection) {
    await mongoose.disconnect();
    connection = null;
  }
}

module.exports = { connectToDatabase, disconnectToDatabase };
