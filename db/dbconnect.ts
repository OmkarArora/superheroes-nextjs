import mongoose from "mongoose";

type Connection = {
  isConnected?: number;
};

const connection: Connection = {};

async function dbConnect() {
  let mongoURI: string | undefined = process.env.MONGO_URI;

  if (connection.isConnected) {
    return;
  }

  if (mongoURI) {
    const db = await mongoose.connect(mongoURI);

    connection.isConnected = db.connections[0].readyState;
  }
}

export default dbConnect;
