import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

async function connect() {
  const client = new MongoClient('mongodb://localhost:27017');
  const connection = await client.connect();
  return connection.db("meetme-db");
}

const port = 3001;

const app = express();

app.use(cors());
app.use(express.json());

const database = await connect();
app.set("db", database);

app.listen(port, () => {
  console.info(`Server is running at http://localhost:${port}`)
});