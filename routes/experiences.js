import { Router } from "express";
import { getExperience, getExperienceId, createExperience, updateExperience, deleteExperience } from "../controllers/experienceController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", getExperience);
router.get("/:id", getExperienceId);
router.post("/", authenticateToken, createExperience);
router.put("/:id", authenticateToken, updateExperience);
router.delete("/:id", authenticateToken, deleteExperience);

export default router;