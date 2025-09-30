import { Router } from "express";
import { analysisController } from "../controllers/analysisController.js";

const router = Router();

router.post("/emotion", analysisController.emotion);
router.post("/sentiment", analysisController.sentiment);
router.post("/test", analysisController.test);

export default router;
