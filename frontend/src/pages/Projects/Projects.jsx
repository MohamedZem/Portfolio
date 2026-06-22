import { useEffect, useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Carousel from "../../components/Carousel/Carousel";
import Modal from "../../components/Modal/Modal";
import { getProjects } from "../../services/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data))
      .catch((error) => console.error(error));
  }, []);

  if (!projects.length) {
    return <main className="projects-page">Chargement...</main>;
  }

  const currentProject = projects[currentIndex];

  return (
  <main className="projects-page">
    <h2>Mes projets</h2>

    <Carousel
      projects={projects}
      currentIndex={currentIndex}
      setCurrentIndex={setCurrentIndex}
    />
    <div className="projects-page__infos">
      <h3>{currentProject.title}</h3>
      <div className="projects-page__tags">
          {currentProject.technologies.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      <p>{currentProject.description}</p>
    
    <div className="projects-page__preview">
      <button
        className="projects-page__preview-button"
        onClick={() => setIsModalOpen(true)}
        aria-label={`Agrandir l'image du projet ${currentProject.title}`}
      >
        <img src={currentProject.imageUrl} alt={currentProject.title} />
      </button>
    </div>

   

      <div className="projects-page__links">
        <a
          href={currentProject.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
          Dépôt GitHub
        </a>

        {currentProject.demoUrl && (
          <a
            href={currentProject.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaExternalLinkAlt />
            Voir le site
          </a>
        )}
      </div>
    </div>

    {isModalOpen && (
      <Modal
        imageUrl={currentProject.imageUrl}
        title={currentProject.title}
        onClose={() => setIsModalOpen(false)}
      />
    )}
  </main>
);
}

export default Projects;