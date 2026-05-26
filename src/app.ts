import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import notesRoutes from "./routes/notes.routes";
import { errorMiddleware } from "./middleware/error.middleware";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);
app.use(errorMiddleware);

export default app;
