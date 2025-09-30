import { Router } from "express";
import commentController from "../controllers/commentController.js";

const router = Router();

router.get("/", commentController.getComments);
router.get("/:id", commentController.getCommentById);
router.post("/", commentController.createComment);
router.put("/:id", commentController.updateComment);
router.delete("/:id", commentController.deleteComment);

export default router;
