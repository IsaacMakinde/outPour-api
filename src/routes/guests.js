import { Router } from "express";
import eventGuestController from "../controllers/eventGuestController.js";
import { verifyFirebaseToken } from "../middlewares/authMiddleware.js";

const router = Router();
router.get("/", verifyFirebaseToken, eventGuestController.getAllGuests);
router.get("/:id", verifyFirebaseToken, eventGuestController.getGuestById);
router.post("/", verifyFirebaseToken, eventGuestController.addGuest);
router.put("/:id", verifyFirebaseToken, eventGuestController.updateGuest);
router.delete("/:id", verifyFirebaseToken, eventGuestController.deleteGuest);

export default router;
