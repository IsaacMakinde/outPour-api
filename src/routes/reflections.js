import { Router } from "express";
import reflectionController from "../controllers/reflectionController.js";
import { verifyFirebaseToken } from "../middlewares/authMiddleware.js";

const router = Router();

// get all reflections
router.get("/", reflectionController.getReflections);

// get all reflections related to a verse
router.get("/verses", reflectionController.getReflectionByVerse);

// create and updated reflections
router.put("/", verifyFirebaseToken, reflectionController.createReflection);

// delete reflection
router.delete("/:id", verifyFirebaseToken, reflectionController.delete);

export default router;
