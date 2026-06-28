const Project = require("../models/Project");
const { getGithubPortfolioProjects } = require("../services/github");

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, updatedAt: -1 });

    return res.status(200).json(projects);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erreur lors de la récupération des projets.",
    });
  }
};

exports.syncProjects = async (req, res) => {
  try {
    console.log("Synchronisation des projets depuis GitHub");

    const projects = await getGithubPortfolioProjects();

    await Project.deleteMany();

    await Project.insertMany(
      projects.map((project) => ({
        githubId: project.id,
        githubName: project.githubName,
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        imageUrl: project.imageUrl,
        logoUrl: project.logoUrl,
        galleryUrls: project.galleryUrls,
        githubUrl: project.githubUrl,
        demoUrl: project.demoUrl,
        order: project.order,
        featured: project.featured,
        category: project.category,
        context: project.context,
        objectives: project.objectives,
        skills: project.skills,
        results: project.results,
        improvements: project.improvements,
        updatedAt: project.updatedAt,
      }))
    );

    return res.status(200).json({
      message: "Projets synchronisés avec succès.",
      count: projects.length,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erreur lors de la synchronisation des projets.",
    });
  }
};