import { Router } from "express";
import journalController from "../controllers/journalController.js";
import { verifyFirebaseToken } from "../middlewares/authMiddleware.js";

const router = Router();

// get request
router.get("/", journalController.getJournals);
// post requests
router.post("/", journalController.createPost);
// upsert journal entreries
router.put("/entries", journalController.upsertJournal);
// get jounrnals belonging to user
router.get("/users/:id", journalController.getJournalsByUser);
// get journals based on id
router.get("/:id", journalController.getJournalById);

// update requests
router.put("/:id", journalController.updateJournal);

// delete requests
router.delete("/:id", verifyFirebaseToken, journalController.deleteJournal);

export default router;
