import { MongoClient } from "mongodb";

export const connectToDatabase = async (connectionString) => {
  try {
    const mongoClient = new MongoClient(connectionString);
    console.log("Connecting to database...");
    await mongoClient.connect();
    console.log("Connected to database");
    return mongoClient;
  } catch (error) {
    console.log("Error to database");
    process.exit();
  }
};
