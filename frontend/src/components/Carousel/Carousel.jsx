import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Carousel({ projects, currentIndex, setCurrentIndex }) {
  if (!projects.length) return null;

  const previousProject = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? projects.length - 1 : prev - 1
    );
  };

  const nextProject = () => {
    setCurrentIndex((prev) =>
      prev === projects.length - 1 ? 0 : prev + 1
    );
  };

  const visibleProjects = [];

  for (let offset = -2; offset <= 2; offset++) {
    const index = (currentIndex + offset + projects.length) % projects.length;

    visibleProjects.push({
      project: projects[index],
      index,
      offset,
      active: offset === 0,
    });
  }

  return (
    <section className="carousel" aria-label="Carousel des projets">
      <button
        className="carousel__arrow"
        onClick={previousProject}
        aria-label="Afficher le projet précédent"
      >
        <FaChevronLeft aria-hidden="true" />
      </button>

      <div className="carousel__thumbs">
        {visibleProjects.map(({ project, index, offset, active }) => (
          <button
            key={`${project.id}-${index}`}
            className={`carousel__thumb carousel__thumb--offset-${offset + 2} ${
              active ? "carousel__thumb--active" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Afficher le projet ${project.title}`}
            aria-current={active ? "true" : undefined}
          >
            <img 
              src={project.logoUrl} 
              alt="" 
              loading="lazy"
              aria-hidden="true" 
            />
          </button>
        ))}
      </div>

      <button
        className="carousel__arrow"
        onClick={nextProject}
        aria-label="Afficher le projet suivant"
      >
        <FaChevronRight aria-hidden="true" />
      </button>
    </section>
  );
}

export default Carousel;