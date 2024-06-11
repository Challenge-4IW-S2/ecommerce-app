import express from "express";
import cookieParser from "cookie-parser";
import {router} from "./src/routes/user.js";
import user from "./src/routes/user.js";
import security from "./src/routes/security.js";

const app = express();

//function parseBody(req, res, next) {
//  const data = [];
//  req.on("data", (chunk) => {
//    data.push(chunk);
//  });
//  req.on("end", () => {
//    const buffer = Buffer.concat(data);
//    const body = buffer.toString();
//    try {
//      const bodyParsed = JSON.parse(body);
//      req.body = bodyParsed;
//      next();
//    } catch (e) {
//      return res.sendStatus(400);
//    }
//  });
//}

//app.use(parseBody);
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req, res, next) => {
    res.send("Coucou " + JSON.stringify(req.query));
});
app.post("/", (req, res, next) => {
    res.send("Coucou FROM POST " + JSON.stringify(req.body));
});

app.use("/users", user);
app.use(security);
app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});