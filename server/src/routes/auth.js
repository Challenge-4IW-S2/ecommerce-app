import {AuthController} from "../controllers/AuthController.js";
import checkAuth from "../middlewares/checkAuth.js";
import checkNotAuth from "../middlewares/checkNotAuth.js";
import UserRepository from "../postgresql/repository/UserRepository.js";
import UserRoleRepository from "../postgresql/repository/UserRoleRepository.js";

export default function (router) {
    // Front route to check if user is authenticated
    router.get('/auth-check', checkAuth(), AuthController.authCheck);

    router.post("/signup", checkNotAuth(),AuthController.signup);

    router.post("/login", checkNotAuth(), AuthController.login);
    router.get('/logout', AuthController.logout);

    router.get('/logout', checkAuth(), AuthController.logout);

    router.post('/forgot-password', checkNotAuth(), AuthController.forgotPassword);
    router.get('/check-reset-password-token', checkNotAuth(), AuthController.checkResetPasswordToken);

    router.get('/verify-token/:token',checkNotAuth(), AuthController.verifyToken);

    // router.post('/reset-password', checkNotAuth(), AuthController.resetPassword);

    return router;
}
