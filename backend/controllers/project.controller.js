const Project = require("../models/Project");

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.getOneProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Projet introuvable" });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();

    res.status(201).json({ message: "Projet créé", project });
  } catch (error) {
    res.status(400).json({ message: "Erreur création projet" });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Projet introuvable" });
    }

    res.status(200).json({ message: "Projet modifié", project });
  } catch (error) {
    res.status(400).json({ message: "Erreur modification projet" });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Projet introuvable" });
    }

    res.status(200).json({ message: "Projet supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur suppression projet" });
  }
};