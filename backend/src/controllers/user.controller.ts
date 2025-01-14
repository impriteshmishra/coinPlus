import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface RegisterRequestBody {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

interface LoginRequestBody {
    email: string;
    password: string;
}

// Registering
export const register = async (req: Request<{}, {}, RegisterRequestBody>, res: Response): Promise<void> => {
    try {
        const { firstname, lastname, email, password } = req.body;

        if (!firstname || !lastname || !email || !password) {
            res.status(401).json({
                message: "Something is missing, please check!",
                success: false,
            });
            return;
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(401).json({
                message: "Try different email",
                success: false,
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "Account created successfully.",
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred during registration.",
            success: false,
        });
    }
};

// Login
export const login = async (req: Request<{}, {}, LoginRequestBody>, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(401).json({
                message: "Something is missing, please check!",
                success: false,
            });
            return;
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({
                message: "Incorrect email or password",
                success: false,
            });
            return;
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            res.status(401).json({
                message: "Incorrect email or password",
                success: false,
            });
            return;
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY as string, { expiresIn: "1h" });

        const userResponse = {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
        };

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        }).json({
            message: `Welcome back ${user.firstname}`,
            success: true,
            user: userResponse,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred during login.",
            success: false,
        });
    }
};

// Logout
export const logout = async (_: Request, res: Response): Promise<void> => {
    try {
        res.cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred during logout.",
            success: false,
        });
    }
};
