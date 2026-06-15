import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaCalendarAlt } from "react-icons/fa";
import illustration from '../../assets/illustration-home.png'

const githubUrl = `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME}`;
const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL;

function Home() {
  return (
    <main className="home">
      <section className="home__content">
        <div className="home__content--text">
          <h2>Développeur Web </h2>
          <h3>
            <strong>Je transforme des idées en <span>applications web</span> modernes et performantes.</strong>
          </h3>
          <p>
            Développeur web passionné, je conçois des applications modernes, performantes et accessibles,
            de l'interface utilisateur jusqu'à la gestion des données.
          </p>
        </div>

        <div className="home__buttons">
          <Link className="home__button" to="/projects">
            Voir mes projets
          </Link>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="home__button"
            >
            <FaGithub />
            GitHub
            </a>

            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="home__button"
            >
            <FaLinkedin />
            LinkedIn
            </a>
        </div>
        <div className="home__infos">
          <div className="home__infos--statut">
            <span className="home__infos--statut-label"></span>
            <p className="home__infos--statut-text">
            Statut : <span>recherche d'alternance</span>
          </p>
          </div>
          <p className="home__infos--availability">
            <FaCalendarAlt />
            Disponible pour une alternance Full-Stack à partir de septembre 2026
          </p>
        </div>
  
      </section>  

      <section className="home__illustration">
        <img src={illustration} alt="Illustration de la page d'accueil" />
      </section>
      
    </main>
  );
}

export default Home;