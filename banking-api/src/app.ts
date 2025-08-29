import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import accRoutes from "./routes/account.routes";
import { errorHandler } from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/accounts", accRoutes);

app.use(errorHandler);

export default app;