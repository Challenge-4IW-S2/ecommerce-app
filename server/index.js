import express from "express";
import cors from "cors";
import "./src/mongo/mongodb.js";
import cookieParser from "cookie-parser";
import RouteLoader from "./RouteLoader.js";

const app = express();
const port = 8000;

app.use(cookieParser(process.env.JWT_SECRET));


const corsOptions = {
  origin: process.env.APP_BASE_URL,
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
const routes = await RouteLoader('src/routes/*.js');
app.use('/', routes);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on http://localhost:${port}`);
});
