const API_URL = import.meta.env.VITE_API_URL;

export const BACKEND_URL = API_URL.replace("/api", "");

async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, options);

  if (!response.ok) {
    throw new Error(`Erreur API : ${response.status}`);
  }

  return response.json();
}

export function getProjects() {
  return apiFetch("/projects");
}