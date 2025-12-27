import { Router } from "express";
import { getProject, getProjectId, createProject, updateProject, deleteProject } from "../controllers/projectController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", getProject);
router.get("/:id", getProjectId);
router.post("/", authenticateToken, createProject);
router.put("/:id", authenticateToken, updateProject);
router.delete("/:id", authenticateToken, deleteProject);

export default router;