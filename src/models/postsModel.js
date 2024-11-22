import "dotenv/config";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../config/dbconfig.js";

const databaseConnection = await connectToDatabase(
  process.env.DATABASE_CONNECTION
);

export const listAllPosts = () => {
  const collection = connectToCollection("posts");
  return collection.find().toArray();
};

export const insertANewPost = (data) => {
  const collection = connectToCollection("posts");
  return collection.insertOne(data);
};

export const updateAPost = (id, newData) => {
  const collection = connectToCollection("posts");
  const objID = ObjectId.createFromHexString(id);
  return collection.updateOne({ _id: new ObjectId(objID) }, { $set: newData });
};

const connectToCollection = (collectionName) => {
  const db = databaseConnection.db("imersao-instabytes");
  return db.collection(collectionName);
};
