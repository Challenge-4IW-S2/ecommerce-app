import jwt from "jsonwebtoken";
import UserRepository from "../postgresql/repository/UserRepository.js";


export default () => async (request, response, next) => {

    const token = request.signedCookies?.JWT ?? null;
    if (!token) return response.sendStatus(401);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userRepository = new UserRepository();

        const user = await userRepository.findByPk(decoded.userId);
        if (!user || !user.is_verified || user.deleted) {
            // destroy the cookie
            response.clearCookie('JWT', {
                httpOnly: true,
                signed: true
            });
            return response.sendStatus(401);
        }

        request.user = user;
        next();
    } catch (e) {
        return response.sendStatus(401);
    }
}

