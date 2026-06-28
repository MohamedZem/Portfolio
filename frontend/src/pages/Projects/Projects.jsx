import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../services/api";
import { FaGithub, FaExternalLinkAlt, FaEye } from "react-icons/fa";
import Carousel from "../../components/Carousel/Carousel";
import Modal from "../../components/Modal/Modal";
import { getProjects } from "../../services/api";
import { Link } from "react-router-dom";
import { Icons } from "../../services/Icons";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProjects()
      .then((data) => {
        
        if (Array.isArray(data)) {
          setProjects(data);
          setCurrentIndex(0);
        } else {
          setProjects([]);
        }
      })
      .catch((error) => {
        console.error(error);
        setError("Impossible de charger les projets.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="projects-page">
        Chargement...
      </main>
    );
  }

  if (error) {
    return (
      <main className="projects-page">
        {error}
      </main>
    );
  }

  if (!projects.length) {
    return (
      <main className="projects-page">
        Aucun projet disponible.
      </main>
    );
  }

  const safeIndex = Math.min(currentIndex, projects.length - 1);
  const currentProject = projects[safeIndex];

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
  {currentProject.technologies?.map((tech) => {
    const Icon = Icons[tech];

    return (
      <span key={tech}>
        {Icon && <Icon />}
        {tech}
      </span>
    );
  })}
</div>
      <p>{currentProject.description}</p>
    
    <div className="projects-page__preview">
      <button
        className="projects-page__preview-button"
        onClick={() => setIsModalOpen(true)}
        aria-label={`Agrandir l'image du projet ${currentProject.title}`}
      >
        <img
          src={`${BACKEND_URL}${currentProject.imageUrl}`}
          alt={currentProject.title}
          loading="eager"
        />
      </button>
    </div>

   

      <div className="projects-page__links">
        <Link to={`/projects/${currentProject.githubName}`}
        className="projects-page__details"
        aria-label={`Voir les détails du projet ${currentProject.title}`}
        >
          <FaEye aria-hidden="true"/>
          Voir le détail
        </Link>
        <a
          href={currentProject.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Voir le dépôt GitHub du projet ${currentProject.title}`}
        >
          <FaGithub aria-hidden="true"/>
          Dépôt GitHub
        </a>

        {currentProject.demoUrl && (
          <a
            href={currentProject.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Voir la démonstration du projet ${currentProject.title}`}
          >
            <FaExternalLinkAlt aria-hidden="true"/>
            Voir le site
          </a>
        )}
      </div>
    </div>

    {isModalOpen && (
      <Modal
        imageUrl={`${BACKEND_URL}${currentProject.imageUrl}`}
        title={currentProject.title}
        onClose={() => setIsModalOpen(false)}
      />
    )}
  </main>
);
}

export default Projects;