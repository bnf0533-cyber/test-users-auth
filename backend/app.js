import express from "express";
import cors from "cors";
import "dotenv/config";
import "./db/db.config.js";
import router from "./routes/user.route.js";
const app = express();
const PORT = process.env.PORT;
app.use(cors());

app.use(express.json());

app.use("/auth", router);

app.listen(PORT, () => {
    console.log(`server running on ${PORT}...`);
});
