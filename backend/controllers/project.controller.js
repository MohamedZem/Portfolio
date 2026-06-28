const { getGithubPortfolioProjects } = require("../services/github");

let cachedProjects = null;
let cacheDate = null;
let pendingProjectsRequest = null;

const CACHE_DURATION = 1000 * 60 * 60;

exports.getAllProjects = async (req, res) => {
  try {
    const now = Date.now();

    if (cachedProjects && cacheDate && now - cacheDate < CACHE_DURATION) {
      console.log("Projets servis depuis le cache");
      return res.status(200).json(cachedProjects);
    }

    if (pendingProjectsRequest) {
      console.log("Récupération déjà en cours");
      const projects = await pendingProjectsRequest;
      return res.status(200).json(projects);
    }

    console.log("Récupération des projets depuis GitHub");

    pendingProjectsRequest = getGithubPortfolioProjects();

    const projects = await pendingProjectsRequest;

    cachedProjects = projects ?? [];
    cacheDate = Date.now();
    pendingProjectsRequest = null;

    return res.status(200).json(cachedProjects);
  } catch (error) {
    pendingProjectsRequest = null;

    console.error(error);

    return res.status(500).json({
      message: "Erreur lors de la récupération des projets.",
    });
  }
};