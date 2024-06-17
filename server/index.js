import express from "express";
import cors from "cors";
import { indexRouter } from "./src/routes/index.js";
import "./src/mongo/mongodb.js";
import "./src/postgresql/postgresql.js";

const server = express();
const port = 8000;
server.use(cors());
server.use(express.json());
server.use("/", indexRouter);

server.get('/setup', async (req, res) => {
 try {
     await pool.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(100), location TEXT)');
     res.status(200).send({ message: 'Table Created' });

 } catch (err) {
     console.error(err.message);
     res.sendStatus(500);
 }
});

server.post('/signup',indexRouter);
server.use("/login", indexRouter);
server.use("/users", indexRouter);
server.use("/model", indexRouter);
server.listen(port, "0.0.0.0", () => {
  console.log("Server listening on http://localhost:8000");
});
