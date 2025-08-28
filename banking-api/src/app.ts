import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import accRoutes from "./routes/account.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/accounts", accRoutes);

app.use(errorHandler);

export default app;