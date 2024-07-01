import express from "express";
import cors from "cors";
import RouteLoader from "./RouteLoader.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const routes = await RouteLoader('src/routes/*.js');
app.use('/', routes);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on http://localhost:${port}`);
});
