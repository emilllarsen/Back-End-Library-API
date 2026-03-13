import { MongoClient } from "mongodb";

const CONNECTION_URI = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.DB_NAME}?appName=${process.env.APP_NAME}`;

const client = new MongoClient(CONNECTION_URI);

export async function connect() {
  try {
    await client.connect();
  } catch (err) {
    console.error("Could not connect to Mongo DB", err);
    process.exit(1); // Indicate its an error
  }
}

export async function close() {
  try {
    await client.close();
  } catch (err) {
    console.error("Could not close connection to Mongo DB", err);
    process.exit(1); // Indicate its an error
  }
}

export const db = client.db();
