import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import mediaRouter from "./routes/media.route.js";
import courseRouter from "./routes/course.route.js";
import courseProgressRouter from "./routes/courseProgress.route.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);
app.use(cookieParser());

app.get("/ping", (_req, res) => {
    res.send("<h1>PONG</h1>");
});

//api
app.use("/api/v1/media", mediaRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/progress", courseProgressRouter);

export default app;
