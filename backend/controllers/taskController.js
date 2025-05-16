const Task = require("../models/Task");
const Project = require("../models/Project");

// CREATE TASK
// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project || project.user.toString() !== req.user._id.toString())
      return res
        .status(404)
        .json({ message: "Project not found or unauthorized" });

    const task = new Task({
      title,
      description,
      status,
      project: projectId,
      completedAt: status === "completed" ? new Date() : null,
    });

    await task.save();

    project.tasks.push(task._id);
    await project.save();

    // Populate the task before sending it back
    const populatedTask = await Task.findById(task._id).populate("project");

    res.status(201).json(populatedTask); // Return full task data
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ TASKS OF A PROJECT
// READ TASKS OF A PROJECT
exports.getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId).populate("tasks");
    if (!project || project.user.toString() !== req.user._id.toString())
      return res
        .status(404)
        .json({ message: "Project not found or unauthorized" });

    // Returning populated tasks for better details
    res.status(200).json(project.tasks); // Tasks should be fully populated
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE TASK
// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status } = req.body;

    const task = await Task.findById(taskId).populate("project");
    if (!task || task.project.user.toString() !== req.user._id.toString())
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.completedAt = status === "completed" ? new Date() : null;

    await task.save();

    // Populate the updated task before sending it back
    const populatedTask = await Task.findById(task._id).populate("project");

    res.status(200).json(populatedTask); // Return full task data
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId).populate("project");
    if (!task || task.project.user.toString() !== req.user._id.toString())
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });

    await task.deleteOne();

    // Remove from project
    await Project.findByIdAndUpdate(task.project._id, {
      $pull: { tasks: taskId },
    });

    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
