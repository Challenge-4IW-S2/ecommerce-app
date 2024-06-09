import {Router} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../postgresql/model/User.js";
const router = new Router();

router.post("/login", async (req, res, next) => {
    const user = await User.findOne({
        where: {
            email: req.body.email,
        },
    });
    if (!user) return res.sendStatus(401, "User not found");
    if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res.sendStatus(401, "Wrong password");
    }

    const token = jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "30 days",
            algorithm: "HS256",
        }
    );

    res.cookie("JWT", token, {
        httpOnly: true,
        signed: true,
    });

    res.json(user);
});

export default router;