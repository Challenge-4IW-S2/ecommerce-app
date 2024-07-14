import jwt from "jsonwebtoken";
import UserRepository from "../postgresql/Repository/UserRepository.js";


export default () => async (request, response, next) => {
    const token = request.signedCookies?.JWT ?? null;
    if (!token) return response.sendStatus(401);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userRepository = new UserRepository();
        request.user = await userRepository.findByPk(decoded.userId);
        return response.json({ user: request.user }).send();
        next();
    } catch (e) {
        console.error(e.message);
        return response.status(401).json({
            e: e.message
        }).send()
        // return response.sendStatus(401);
    }
    next();
}