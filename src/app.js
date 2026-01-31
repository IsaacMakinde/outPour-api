import express from "express";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import analysisRoutes from "./routes/analysis.js";
import commentRoutes from "./routes/comments.js";
import journalRoutes from "./routes/journals.js";
import reflectionsRoutes from "./routes/reflections.js";
import errorHandler from "./middlewares/errorHandler.js";
import guestRoutes from "./routes/guests.js";
import eventRoutes from "./routes/event.js";
import userRoutes from "./routes/user.js";
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
app.use("/api/reflections", reflectionsRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);
app.use("api/guests", guestRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

export default app;
