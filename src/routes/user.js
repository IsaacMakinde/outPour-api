import { Router } from "express";
import userController from "../controllers/userController.js";
import { verifyFirebaseToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", verifyFirebaseToken, userController.getUsers);
router.get("/:id", verifyFirebaseToken, userController.getUserById);

export default router;
