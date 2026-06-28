require("dotenv").config();

const path = require("path");
const mongoose = require("mongoose");
const Project = require("../models/Project");
const { optimizeImageFromUrl } = require("../services/image");

const GITHUB_API_URL = "https://api.github.com";
const imagesDir = path.join(__dirname, "../images");

const allowedRepos = [
  "Booki",
  "Kasa",
  "Nina-Carducci",
  "Sophie_Bluel",
  "Mon_Vieux_Grimoire",
  "Menu-Maker",
];

function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

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
    throw new Error(`Erreur GitHub : ${response.status} - ${errorText}`);
  }

  return response.json();
}

async function getUserRepos() {
  const repos = await githubFetch(
    `${GITHUB_API_URL}/users/${process.env.GITHUB_USERNAME}/repos?per_page=100&sort=updated`
  );

  return repos.filter((repo) => allowedRepos.includes(repo.name));
}

async function getPortfolioFile(owner, repoName) {
  const file = await githubFetch(
    `${GITHUB_API_URL}/repos/${owner}/${repoName}/contents/portfolio.json`
  );

  const content = Buffer.from(file.content, "base64").toString("utf-8");
  return JSON.parse(content);
}

function getRawGithubFileUrl(owner, repoName, branch, filePath) {
  return `https://raw.githubusercontent.com/${owner}/${repoName}/${branch}/${filePath}`;
}

async function buildProject(repo, portfolioData, username) {
  const slug = createSlug(repo.name);
  const projectImagesDir = path.join(imagesDir, slug);

  let imageUrl = "";
  let logoUrl = "";
  const galleryUrls = [];

  if (portfolioData.image) {
    const rawImageUrl = getRawGithubFileUrl(
      username,
      repo.name,
      repo.default_branch,
      portfolioData.image
    );

    await optimizeImageFromUrl({
      imageUrl: rawImageUrl,
      outputDir: projectImagesDir,
      filename: "preview.webp",
      type: "image",
    });

    imageUrl = `/images/${slug}/preview.webp`;
  }

  if (portfolioData.logo) {
    const rawLogoUrl = getRawGithubFileUrl(
      username,
      repo.name,
      repo.default_branch,
      portfolioData.logo
    );

    await optimizeImageFromUrl({
      imageUrl: rawLogoUrl,
      outputDir: projectImagesDir,
      filename: "logo.webp",
      type: "logo",
    });

    logoUrl = `/images/${slug}/logo.webp`;
  }

  if (Array.isArray(portfolioData.gallery)) {
    for (let index = 0; index < portfolioData.gallery.length; index++) {
      const imagePath = portfolioData.gallery[index];

      const rawGalleryUrl = getRawGithubFileUrl(
        username,
        repo.name,
        repo.default_branch,
        imagePath
      );

      const filename = `gallery-${index + 1}.webp`;

      await optimizeImageFromUrl({
        imageUrl: rawGalleryUrl,
        outputDir: projectImagesDir,
        filename,
        type: "image",
      });

      galleryUrls.push(`/images/${slug}/${filename}`);
    }
  }

  return {
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

async function syncProjects() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connexion MongoDB réussie");

    const username = process.env.GITHUB_USERNAME;
    const repos = await getUserRepos();

    const projects = [];

    for (const repo of repos) {
  try {
    console.log(`Synchronisation : ${repo.name}`);

    const portfolioData = await getPortfolioFile(username, repo.name);
    const project = await buildProject(repo, portfolioData, username);

    projects.push(project);
  } catch (error) {
    console.error(`Erreur sur le projet ${repo.name} :`, error.message);
  }
}

    await Project.deleteMany();
    await Project.insertMany(projects);

    console.log(`${projects.length} projets synchronisés dans MongoDB`);

    await mongoose.disconnect();
    console.log("Synchronisation terminée");
  } catch (error) {
    console.error("Erreur synchronisation :", error);
    process.exit(1);
  }
}

syncProjects();