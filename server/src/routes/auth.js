import {AuthController} from "../controllers/AuthController.js";

export default function (router) {
    // test middleware checkAuth (bidon mdr mais ça marche)
    //router.get("/login", checkAuth(true), (req, res) => res.send("You are logged in"));
    router.post("/login", AuthController.login);
    router.post("/signup", AuthController.signup);
    router.post('/logout', AuthController.logout);
    return router;
}

