import jwt from "jsonwebtoken";

export const generateToken = async (payload) => {
    const token = await jwt.sign(
        { userId: payload._id },
        process.env.SECRET_KEY,
        {
            expiresIn: process.env.EXPIRESIN || "1d",
        },
    );

    return token;
};

export const verifyToken = async (token) => {
    return await jwt.verify(token, process.env.SECRET_KEY);
};
