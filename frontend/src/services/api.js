const API_URL = "http://localhost:4000/api";

export async function getProjects() {
  const response = await fetch(`${API_URL}/projects`);

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des projets");
  }

  return response.json();
}