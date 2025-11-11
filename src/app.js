import express from "express";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import analysisRoutes from "./routes/analysis.js";
import commentRoutes from "./routes/comments.js";
import journalRoutes from "./routes/journals.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/posts", postRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/journals", journalRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

export default app;
