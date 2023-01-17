import express from "express";
import dotenv from "dotenv";
import Connection from "./database/db.js";
import cors from "cors";
import bodyParser from "body-parser";
import Routes from "./routes/route.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
dotenv.config();
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use("/", Routes);

const userName = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(userName, password);

app.listen(3001, () => {
    console.log("Server started on port 3001.");
});