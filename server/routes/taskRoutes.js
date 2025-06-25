import express from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(requireAuth); // protect all routes below

router.get("/", getTasks);          // Get all tasks for logged in user
router.get("/:id", getTask);        // Get single task by ID
router.post("/", createTask);       // Create a new task
router.put("/:id", updateTask);     // Update a task
router.delete("/:id", deleteTask);  // Delete a task

export default router;
