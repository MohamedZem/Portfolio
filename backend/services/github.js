const GITHUB_API_URL = "https://api.github.com";
const { optimizeGithubImage } = require("./image");

const getApiBaseUrl = () => process.env.API_BASE_URL || "http://localhost:4000";

async function githubFetch(url) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-backend",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erreur GitHub API : ${response.status} - ${errorText}`);
  }

  return response.json();
}

async function getUserRepos() {
  return githubFetch(
    `${GITHUB_API_URL}/users/${process.env.GITHUB_USERNAME}/repos?per_page=100&sort=updated`
  );
}

async function getPortfolioFile(owner, repoName) {
  try {
    console.log(`Recherche de portfolio.json dans : ${repoName}`);

    const file = await githubFetch(
      `${GITHUB_API_URL}/repos/${owner}/${repoName}/contents/portfolio.json`
    );

    console.log(`portfolio.json trouvé dans : ${repoName}`);

    const content = Buffer.from(file.content, "base64").toString("utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.log(`Aucun portfolio.json trouvé dans : ${repoName}`);
    return null;
  }
}

function getRawGithubFileUrl(owner, repoName, branch, filePath) {
  return `https://raw.githubusercontent.com/${owner}/${repoName}/${branch}/${filePath}`;
}

async function buildOptimizedImageUrl({
  username,
  repo,
  imagePath,
  imageName,
  type = "image",
}) {
  if (!imagePath) {
    return null;
  }

  try {
    const rawImageUrl = getRawGithubFileUrl(
      username,
      repo.name,
      repo.default_branch,
      imagePath
    );

    const optimizedPath = await optimizeGithubImage(
      rawImageUrl,
      imageName,
      repo.updated_at,
      type
    );

    if (!optimizedPath) {
      return null;
    }

    return `${getApiBaseUrl()}${optimizedPath}`;
  } catch (error) {
    console.log(`Image ignorée pour ${repo.name} : ${imagePath}`);
    return null;
  }
}

async function buildGalleryUrls(portfolioData, username, repo) {
  if (!Array.isArray(portfolioData.gallery)) {
    return [];
  }

  const galleryUrls = [];

  for (let index = 0; index < portfolioData.gallery.length; index++) {
    const imagePath = portfolioData.gallery[index];

    const galleryUrl = await buildOptimizedImageUrl({
      username,
      repo,
      imagePath,
      imageName: `${repo.name}-gallery-${index + 1}`,
      type: "image",
    });

    if (galleryUrl) {
      galleryUrls.push(galleryUrl);
    }
  }

  return galleryUrls;
}

async function buildProject(repo, portfolioData, username) {
  const imageUrl = await buildOptimizedImageUrl({
    username,
    repo,
    imagePath: portfolioData.image,
    imageName: `${repo.name}-image`,
    type: "image",
  });

  const logoUrl = await buildOptimizedImageUrl({
    username,
    repo,
    imagePath: portfolioData.logo,
    imageName: `${repo.name}-logo`,
    type: "logo",
  });

  const galleryUrls = await buildGalleryUrls(portfolioData, username, repo);

  return {
    id: repo.id,
    githubName: repo.name,
    title: portfolioData.title || repo.name,
    description: portfolioData.description || repo.description || "",
    technologies: portfolioData.technologies || [],
    imageUrl,
    logoUrl,
    galleryUrls,
    githubUrl: repo.html_url,
    demoUrl: portfolioData.demoUrl || repo.homepage || "",
    order: portfolioData.order || 0,
    featured: portfolioData.featured || false,
    category: portfolioData.category || "Autre",
    context: portfolioData.context || "",
    objectives: portfolioData.objectives || [],
    skills: portfolioData.skills || [],
    results: portfolioData.results || [],
    improvements: portfolioData.improvements || [],
    updatedAt: repo.updated_at,
  };
}

exports.getGithubPortfolioProjects = async () => {
  console.log("Récupération des projets");

  const username = process.env.GITHUB_USERNAME;
  const allowedRepos = [
  "Booki",
  "Kasa",
  "Nina-Carducci",
  "Sophie_Bluel",
  "Mon_Vieux_Grimoire",
  "Menu-Maker",
];

const repos = (await getUserRepos()).filter((repo) =>
  allowedRepos.includes(repo.name)
);

  const projects = [];

  for (const repo of repos) {
    const portfolioData = await getPortfolioFile(username, repo.name);

    if (!portfolioData) {
      continue;
    }

    const project = await buildProject(repo, portfolioData, username);
    projects.push(project);
  }

  return projects.sort((a, b) => a.order - b.order);
};