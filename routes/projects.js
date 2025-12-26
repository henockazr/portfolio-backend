import { Router } from "express";
import { getProject, getProjectId, createProject, updateProject, deleteProject } from "../controllers/projectController.js";

const router = Router();

router.get("/", getProject);
router.get("/:id", getProjectId);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;