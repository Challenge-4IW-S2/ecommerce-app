import {AuthController} from "../controllers/AuthController.js";
import checkAuth from "../middlewares/checkAuth.js";

export default function (router) {
    // test middleware checkAuth (bidon mdr mais ça marche)
    //router.get("/login", checkAuth(true), (req, res) => res.send("You are logged in"));
    router.post("/login", AuthController.login);
    router.post("/signup", AuthController.signup);
    router.get('/logout', AuthController.logout);

    router.get('/test-auth', checkAuth(), AuthController.deleteAccount)

    // TODO: Check auth middleware
    router.post('/forgot-password', AuthController.forgotPassword);
    router.get('/check-reset-password-token', AuthController.checkResetPasswordToken);

    router.post('/delete-account', AuthController.deleteAccount);
    return router;
}

