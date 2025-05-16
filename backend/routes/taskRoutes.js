const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/:projectId", authMiddleware, createTask);
router.get("/:projectId", authMiddleware, getTasks);
router.put("/update/:taskId", authMiddleware, updateTask);
router.delete("/delete/:taskId", authMiddleware, deleteTask);

module.exports = router;
