import { MongoClient, ServerApiVersion } from "mongodb";
import "dotenv/config";

// Tạo biến chứa database instance, ban đầu là null
let databaseInstance;

// Tạo 1 đối tượng Client để connect với MongoDb
const mongoClientInstance = new MongoClient(`${process.env.MONGODB_URI}`, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const C0NNECT_DB = async function (callback) {
  // Tạo kết nối tới MongoDB
  await mongoClientInstance.connect();
  databaseInstance = mongoClientInstance.db(process.env.DATABASE_NAME);

  callback();
};

export const GET_DB = () => {
  if (!databaseInstance) throw new Error("No database found");

  return databaseInstance;
};

export const CLOSE_DB = async () => {
  await mongoClientInstance.close();
};
