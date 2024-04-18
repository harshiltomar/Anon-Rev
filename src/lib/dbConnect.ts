import mongoose, { mongo } from "mongoose";

// check datatype of objet
type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  // Check if it is alreay Connected
  if (connection.isConnected) {
    console.log("Already connected to Database");
    return;
  }

  try {
    // Connect to DB
    const db = await mongoose.connect(process.env.MONGODB_URI || "");

    // Used to return the Number, helps check if the DB is total Ready or Not
    connection.isConnected = db.connections[0].readyState;
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("Database Connection failed", error);
    process.exit();
  }
}

export default dbConnect;
