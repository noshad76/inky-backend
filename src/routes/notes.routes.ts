import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getNotes, pull, push } from "../controllers/notes.controller";

const router = Router();
router.get("/", authMiddleware, getNotes);
router.post("/push", authMiddleware, push);
router.get("/pull", authMiddleware, pull);

export default router;
