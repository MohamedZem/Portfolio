import { useEffect, useState } from "react";
import { getProjects } from "../../services/api";

const initialProjects = [
  {
    id: 1,
    title: "Booki",
    description: "Intégration responsive d'une page d'accueil en HTML et CSS.",
    technologies: ["HTML", "CSS"]
  },
  {
    id: 2,
    title: "Kasa",
    description: "Application React avec React Router et composants dynamiques.",
    technologies: ["React", "Sass"]
  },
  {
    id: 3,
    title: "Mon Vieux Grimoire",
    description: "API sécurisée avec Node.js, Express et MongoDB.",
    technologies: ["Node.js", "Express", "MongoDB"]
  }
];

function Projects() {
  const [projects, setProjects] = useState(initialProjects);

  useEffect(() => {
  getProjects()
    .then((data) => {
      if (data.length > 0) {
        setProjects(data);
      }
    })
    .catch((error) => console.error(error));
}, []);
  return (
    <main className="page">
      <h2>Mes projets</h2>

      <section className="projects">
        {projects.map((project) => (
          <article className="project__card" key={project.id}>
            <h3>{project.title}</h3>
              <p>{project.description}</p>

      <div className="projects__tag">
        {project.technologies.map((tech, index) => (
          <span key={`${project.id}-${tech}-${index}`}>{tech}</span>
        ))}
      </div>
          </article>
))}
    </section>
  </main>
  );
}

export default Projects;