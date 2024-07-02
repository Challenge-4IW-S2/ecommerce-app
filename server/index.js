import express from "express";
import cors from "cors";
import { indexRouter } from "./src/routes/index.js";
import "./src/mongo/mongodb.js";
import cookieParser from "cookie-parser";

const server = express();
const port = 8000;
server.use(cookieParser(process.env.JWT_SECRET));
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true
};
server.use(cors(corsOptions));
server.use(express.json());
server.use("/", indexRouter);

server.post('/signup',indexRouter);
server.use("/login", indexRouter);
server.use("/users", indexRouter);
server.use("/model", indexRouter);
server.listen(port, "0.0.0.0", () => {
  console.log("Server listening on http://localhost:8000");
});
