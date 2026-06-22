export async function getGithubProjects() {
  const username = import.meta.env.VITE_GITHUB_USERNAME;

  const response = await fetch(`https://api.github.com/users/${username}/repos`);

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des projets GitHub");
  }

  const repos = await response.json();

  return repos
    .filter((repo) => !repo.fork)
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      title: repo.name,
      description: repo.description || "Description à venir.",
      technologies: repo.language ? [repo.language] : [],
      githubUrl: repo.html_url,
      demoUrl: repo.homepage || "",
    }));
}