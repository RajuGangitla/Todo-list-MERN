import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

//routes
import authRouter from "./routes/userRoutes.js";
import tasksRouter from "./routes/taskRoutes.js";
import authenticateUser from "./middleware/authMiddleware.js";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, './client/build')));

//db connection
mongoose.set("strictQuery", true);
connectDb();

// middleware
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", authenticateUser, tasksRouter);

app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
  });

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on ${port}`));
