import jwt from "jsonwebtoken";
import "dotenv/config";

export function createToken(payload) {
    return jwt.sign(payload, process.env.SECRET_JWT, {
        expiresIn: process.env.JWT_TIM,
    });
}

export function verifyToken(token) {
    return jwt.verify(token, process.env.SECRET_JWT);
}
