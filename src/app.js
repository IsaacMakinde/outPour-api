import express from "express";
import cors from "cors";
import postRoutes from "./routes/posts.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

export default app;
