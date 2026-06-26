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

let cachedProjects = null;
let cacheDate = null;

const CACHE_DURATION = 1000 * 60 * 30;

exports.getProjects = async (req, res) => {
  try {
    const now = Date.now();

    if (cachedProjects && cacheDate && now - cacheDate < CACHE_DURATION) {
      return res.status(200).json(cachedProjects);
    }

    const projects = await getGithubPortfolioProjects();

    cachedProjects = projects;
    cacheDate = now;

    return res.status(200).json(projects);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erreur lors de la récupération des projets.",
    });
  }
};