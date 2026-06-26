import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaChevronLeft, FaChevronRight} from "react-icons/fa";
import { getProjects } from "../../services/api";
import Collapse from "../../components/Collapse/Collapse";
import Modal from "../../components/Modal/Modal";


function ProjectDetails() {
  const { githubName } = useParams();
  const [projects, setProjects] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data))
      .catch((error) => console.error(error));
  }, []);

  const project = projects.find((item) => item.githubName === githubName);

  if (!project) {
    return <main className="project-details">Chargement...</main>;
  }

  const images = project.galleryUrls?.length
    ? project.galleryUrls
    : [project.imageUrl];

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    
    <main className="project-details">
        
      <Link 
      to="/projects" className="project-details__back"
      aria-label={`Galerie d'images du projet ${project.title}`}
      >
        <FaArrowLeft aria-hidden="true"/>
        Retour aux projets
      </Link>

      <section className="project-details__hero">
        <h1>{project.title}</h1>
      </section>

      <section 
      className="project-details__carousel" 
      aria-label={`Galerie d'images du projet ${project.title}`}
      >
        <button  className="project-details__arrow" onClick={previousImage} aria-label="Image précédente">
          <FaChevronLeft aria-hidden="true"/>
        </button>

        <div className="project-details__image-wrapper">
          <button
            className="project-details__image-button"
            onClick={() => setIsModalOpen(true)}
            aria-label={`Agrandir l'image du projet ${project.title}`}
          >
            <img
            src={images[currentImageIndex]}
            alt={`Capture du projet ${project.title}`}
            />
          </button>

          <span className="project-details__counter">
            {currentImageIndex + 1} / {images.length}
          </span>
        </div>

        <button  className="project-details__arrow" onClick={nextImage} aria-label="Image suivante">
          <FaChevronRight aria-hidden="true"/>
        </button>
      </section>

      <section className="project-details__collapses">
        <Collapse title="Contexte">
          <p>{project.context}</p>
        </Collapse>

        <Collapse title="Objectifs">
          <ul>
            {project.objectives?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Collapse>

        <Collapse title="Compétences développées">
          <ul>
            {project.skills?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Collapse>

        <Collapse title="Résultats">
          <ul>
            {project.results?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Collapse>

        <Collapse title="Perspectives d'amélioration">
          <ul>
            {project.improvements?.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Collapse>
      </section>

      {isModalOpen && (
        <Modal
            imageUrl={images[currentImageIndex]}
            title={project.title}
            onClose={() => setIsModalOpen(false)}
        />
        )}
    </main>
  );
}

export default ProjectDetails;