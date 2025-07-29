import jwt from "jsonwebtoken";
import { IUser } from "../models/user.model.js";

export const generateToken = (user: IUser): string => {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    }

    return jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: "7d"
    })
}