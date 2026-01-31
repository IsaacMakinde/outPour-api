import { Router } from "express";
import eventController from "../controllers/eventController.js";
import { verifyFirebaseToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", eventController.getEvents);
router.get("/:id", eventController.getEventById);
router.post("/", verifyFirebaseToken, eventController.createEvent);
router.put("/:id", verifyFirebaseToken, eventController.update);
router.delete("/:id", verifyFirebaseToken, eventController.delete);
export default router;
