import { Router } from "express";
import { getExperience, getExperienceId, createExperience, updateExperience, deleteExperience } from "../controllers/experienceController.js";

const router = Router();

router.get("/", getExperience);
router.get("/:id", getExperienceId);
router.post("/", createExperience);
router.put("/:id", updateExperience);
router.delete("/:id", deleteExperience);

export default router;