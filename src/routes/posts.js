import { Router } from "express";
import {
  getPosts,
  getSinglePost,
  addPost,
} from "../controllers/postController.js";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getSinglePost);
router.post("/", addPost);

export default router;
