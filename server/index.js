import express from "express";
import cors from "cors";
import { indexRouter } from "./src/routes/index.js";
import "./src/mongo/mongodb.js";

const server = express();
const port = 8000;
server.use(cors());
server.use(express.json());
server.use("/", indexRouter);

server.post('/signup',indexRouter);
server.use("/login", indexRouter);
server.use("/register", indexRouter);
server.use("/users", indexRouter);
server.use("/model", indexRouter);
server.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on http://localhost:${port}`);
});
