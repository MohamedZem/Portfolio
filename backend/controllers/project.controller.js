const { getGithubPortfolioProjects } = require("../services/github");

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await getGithubPortfolioProjects();

    return res.status(200).json(projects ?? []);
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      message: "Erreur lors de la récupération des projets.",
    });
  }
};