import jwt from "jsonwebtoken";
import UserRepository from "../postgresql/Repository/UserRepository.js";


export default () => async (request, response, next) => {
    const token = request.signedCookies?.JWT ?? null;
    if (!token) {
        next();
    } else {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userRepository = new UserRepository();

            const user = await userRepository.findByPk(decoded.userId);
            if (!user || user.deleted) {
                next();
            } else {
                // User is authenticated, send a response or redirect
                response.sendStatus(403);
            }
        } catch (e) {
            next();
        }
    }
}