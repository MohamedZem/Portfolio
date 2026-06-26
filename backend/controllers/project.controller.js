const { getGithubPortfolioProjects } = require("../services/github");

let cachedProjects = null;
let cacheDate = null;

const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

exports.getAllProjects = async (req, res) => {
  try {
    const now = Date.now();

    if (
      cachedProjects &&
      cacheDate &&
      now - cacheDate < CACHE_DURATION
    ) {
      console.log("📦 Projets servis depuis le cache");
      return res.status(200).json(cachedProjects);
    }

    console.log("🌐 Récupération des projets depuis GitHub");

    const projects = await getGithubPortfolioProjects();

    cachedProjects = projects ?? [];
    cacheDate = now;

    return res.status(200).json(cachedProjects);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erreur lors de la récupération des projets.",
    });
  }
};