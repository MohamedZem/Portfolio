import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaLaptopCode} from "react-icons/fa";
import photo from "../../assets/illustration-home.webp";
import { getProjects } from "../../services/api";


const githubUrl = `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME}`;
const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL;
const email = import.meta.env.VITE_EMAIL;

function Home() {
  return (
    <main className="home">
      <div className="home__noise"></div>
      <div className="home__particles"></div>
      <div className="home__circle"></div>
      <div className="home__dots"></div>
      <section className="home__card">
        <div className="home__profile">
          <img
            src={photo}
            alt="Portrait de Mohamed Zemouchi"
            className="home__photo"
          />

          <h2 className="home__name">
            Mohamed <br />
            Zemouchi
          </h2>

          <p className="home__role">Développeur Web</p>

          <nav className="home__socials" aria-label="Liens sociaux">
            <a
              href={githubUrl}
              aria-label="Voir mon profil GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>

            <a
              href={linkedinUrl}
              aria-label="Voir mon profil LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>

            <a
              href={`mailto:${email}`}
              aria-label="M'envoyer un e-mail"
            >
              <FaEnvelope />
            </a>
          </nav>
        </div>

        <div className="home__intro">
          <p className="home__welcome">Bienvenue,</p>

          <h2 className="home__title">
            Je transforme des idées en{" "}
            <span>applications web</span> modernes et performantes.
          </h2>

          <div className="home__buttons">
            <a
              href="/cv/Mohamed_Zemouchi_CV.pdf"
              download
              className="home__button"
              aria-label="Télécharger mon CV au format PDF"
            >
              <FaDownload aria-hidden="true" />
              CV
            </a>

            <Link
              to="/projects"
              className="home__button"
              aria-label="Voir mes projets"
            >
              <FaLaptopCode aria-hidden="true" />
              Projets
            </Link>
          </div>

          <p className="home__description">
            Développeur web, je conçois des applications modernes, accessibles
            et centrées sur les besoins utilisateurs.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;