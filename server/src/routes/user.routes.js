import express from "express";
import {
    getProfile,
    login,
    logout,
    register,
    updateProfile,
} from "../controllers/user.controllers";
import isAuthenticated from "../middlewares/AuthUser";

const userRouter = express.Router();

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/profile").get(isAuthenticated, getProfile);
userRouter.route("/logout").get(isAuthenticated, logout);
userRouter.route("/profile/update").put(isAuthenticated, updateProfile);

export default userRouter;
