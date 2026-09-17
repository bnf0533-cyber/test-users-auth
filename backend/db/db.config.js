import { MongoClient } from "mongodb";
import "dotenv/config";
const client = new MongoClient(process.env.MONGO_URL);
export const db = client.db("auth-test")

try {
    await client.connect();
    console.log("connection to mongodb successfully!");
} catch (error) {
    console.log("failed to connect to mongodb", error);
    process.exit(1);
}


