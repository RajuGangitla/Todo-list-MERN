import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import authRouter from "./routes/userRoutes.js";
import tasksRouter from "./routes/taskRoutes.js";
import authenticateUser from "./middleware/authMiddleware.js";

const app = express();

//db connection
mongoose.set("strictQuery", true);
connectDb();

// middleware
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", authenticateUser, tasksRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on ${port}`));
