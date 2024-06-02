 import express from "express";
import { indexRouter } from "./routes/index.js";
import { pool } from "./db.js"
const server = express();
const port = 8000;
server.use("/", indexRouter);
server.use(express.json());
 server.get('/setup', async (req, res) => {
     try {
         await pool.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(100), location TEXT)');
         res.status(200).send({ message: 'Table Created' });

     } catch (err) {
         console.error(err.message);
         res.sendStatus(500);
     }
 });

server.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on http://localhost:${port}`);});
