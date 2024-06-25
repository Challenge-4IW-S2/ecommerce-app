import {AuthController} from "../controllers/AuthController.js";
import checkAuth from "../middlewares/checkAuth.js";

export default function (router) {
    router.get("/login", checkAuth(true), (req, res) => res.send("You are logged in"));
    router.post("/login", AuthController.login);
    router.post("/signup", AuthController.signup);
    return router;
}

