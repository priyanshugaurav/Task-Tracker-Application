const Project = require("../models/Project");
const User = require("../models/User");

exports.createProject = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("projects");
    if (user.projects.length >= 4) {
      return res.status(400).json({ message: "Maximum 4 projects allowed" });
    }

    const { name } = req.body;

    const newProject = new Project({
      name,
      user: user._id,
    });

    await newProject.save();

    user.projects.push(newProject._id);
    await user.save();

    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id }).populate(
      "tasks"
    );
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.user.toString() !== req.user._id.toString())
      return res.status(401).json({ message: "Unauthorized" });

    await project.deleteOne();

    // Remove project from user's list
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { projects: req.params.id },
    });

    res.status(200).json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
