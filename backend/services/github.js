const GITHUB_API_URL = "https://api.github.com";
const { optimizeGithubImage } = require("./image");

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

async function buildGalleryUrls(portfolioData, username, repo) {
  if (!portfolioData.gallery || !Array.isArray(portfolioData.gallery)) {
    return [];
  }

  const galleryUrls = await Promise.all(
    portfolioData.gallery.map(async (imagePath, index) => {
      try {
        const rawGalleryUrl = getRawGithubFileUrl(
          username,
          repo.name,
          repo.default_branch,
          imagePath
        );

        const optimizedGalleryPath = await optimizeGithubImage(
          rawGalleryUrl,
          `${repo.name}-gallery-${index + 1}`,
          repo.updated_at,
          "image"
        );

        return `${process.env.API_BASE_URL || "http://localhost:4000"}${optimizedGalleryPath}`;
      } catch (error) {
        console.log(
          `Image galerie ignorée pour ${repo.name} : ${imagePath}`
        );

        return null;
      }
    })
  );

  return galleryUrls.filter(Boolean);
}

async function buildProject(repo, portfolioData, username) {
  let imageUrl = null;
  let logoUrl = null;

  if (portfolioData.image) {
    const rawImageUrl = getRawGithubFileUrl(
      username,
      repo.name,
      repo.default_branch,
      portfolioData.image
    );

    const optimizedPath = await optimizeGithubImage(
      rawImageUrl,
      `${repo.name}-image`,
      repo.updated_at,
      "image"
    );

    imageUrl = `${process.env.API_BASE_URL || "http://localhost:4000"}${optimizedPath}`;
  }

  if (portfolioData.logo) {
    const rawLogoUrl = getRawGithubFileUrl(
      username,
      repo.name,
      repo.default_branch,
      portfolioData.logo
    );

    const optimizedLogoPath = await optimizeGithubImage(
      rawLogoUrl,
      `${repo.name}-logo`,
      repo.updated_at,
      "logo"
    );

    logoUrl = `${process.env.API_BASE_URL || "http://localhost:4000"}${optimizedLogoPath}`;
  }
  
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
  objectives: portfolioData.objectives || "",
  skills: portfolioData.skills || "",
  results: portfolioData.results || "",
  improvements: portfolioData.improvements || "",
  updatedAt: repo.updated_at,
};
}

exports.getGithubPortfolioProjects = async () => {
  console.log ("projets recuper")
  const username = process.env.GITHUB_USERNAME;
  const repos = await getUserRepos();

  const projects = await Promise.all(
  repos.map(async (repo) => {
    const portfolioData = await getPortfolioFile(username, repo.name);

    if (!portfolioData) {
      return null;
    }

    return buildProject(repo, portfolioData, username);
  })
);
  return projects
    .filter(Boolean)
    .sort((a, b) => a.order - b.order);
};