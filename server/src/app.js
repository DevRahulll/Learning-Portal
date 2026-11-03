import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

app.get("/ping", (_req, res) => {
    res.send("<h1>PONG</h1>");
});

//users
app.use("/api/v1/user", userRouter);

export default app;
