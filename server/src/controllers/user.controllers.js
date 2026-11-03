import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exist with this email",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
        });
    } catch (error) {
        console.log("Something went wrong", error);
        return res.status(500).json({
            success: false,
            message: "Failed to register",
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        }

        const token = await generateToken(user);

        const userObj = user.toObject();
        delete userObj.password;

        return res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 24 * 60 * 60 * 1000,
            })
            .json({
                success: true,
                message: `Welcome back ${user.name}`,
                user: userObj,
            });
    } catch (error) {
        console.log("Something went wrong", error);
        return res.status(500).json({
            success: false,
            message: "Failed to login",
        });
    }
};

export const logout = async (_req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true,
        });
    } catch (error) {
        console.log("Something went wrong", error);
        return res.status(500).json({
            success: false,
            message: "Failed to logout",
        });
    }
};

export const getProfile = async (req, res) => {
    try {
        const userId = req.id;
        // const user=await User.findById(userId).populate("enrolledCourses");
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "Profile not found",
                success: false,
            });
        }

        return res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.log("Something went wrong", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch profile",
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { name } = req.body;
        const profilePhoto = req.file;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "user not found",
                success: false,
            });
        }

        // profile pic

        const updatedData = { name };
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
            new: true,
        });

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.log("Something went wrong", error);
        return res.status(500).json({
            success: false,
            message: "Failed to Update profile",
        });
    }
};
