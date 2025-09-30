import { Router } from "express";
import postController from "../controllers/postController.js";
import { verifyFirebaseToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", postController.getPosts);
router.get("/:id", postController.getPostById);
router.post("/", verifyFirebaseToken, postController.createPost);
router.put("/:id", verifyFirebaseToken, postController.updatePost);
router.delete("/:id", verifyFirebaseToken, postController.delete);

export default router;
