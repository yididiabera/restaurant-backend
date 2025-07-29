// Request body interfaces
interface SignupRequestBody {
    name: string;
    email: string;
    password: string;
    role?: string;
}

interface LoginRequestBody {
    email: string;
    password: string;
}

import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { generateToken } from "../utils/generate.token";
import { signupSchema, loginSchema } from "../validators/auth.validator";

export const signup = async (req: Request, res: Response): Promise<Response> => {
    try {
        const parseResult = signupSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid input",
                errors: parseResult.error.issues,
                data: null
            });
        }
        const { name, email, password, role }: SignupRequestBody = parseResult.data;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
                errors: [],
                data: null
            });
        }

        const user = await User.create({ name, email, password, role });
        const token = generateToken(user);
        return res.status(201).json({
            success: true,
            message: "Signup successful",
            errors: [],
            data: {
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token
            }
        });
    } catch (err: unknown) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            errors: [err],
            data: null
        });
    }
}

export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const parseResult = loginSchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid input",
                errors: parseResult.error.issues,
                data: null
            });
        }
        const { email, password }: LoginRequestBody = parseResult.data;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({
            success: false,
            message: "Invalid email or password",
            errors: [],
            data: null
        });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({
            success: false,
            message: "Invalid email or password",
            errors: [],
            data: null
        });

        const token = generateToken(user);
        return res.status(200).json({
            success: true,
            message: "Login successful",
            errors: [],
            data: {
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token
            }
        });
    } catch (err: unknown) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            errors: [err],
            data: null
        });
    }
}