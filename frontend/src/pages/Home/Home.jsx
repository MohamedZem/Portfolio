import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaLaptopCode} from "react-icons/fa";
import photo from "../../assets/illustration-home.webp";

const githubUrl = `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME}`;
const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL;

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

          <div className="home__socials">
            <a href={githubUrl} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>

            <a href={linkedinUrl} alt="LinkedIn" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>

            <a href="mailto:zemouchi.moh@gmail.com" aria-label="Envoyer un email">
              <FaEnvelope />
            </a>
          </div>
        </div>

        <div className="home__intro">
          <h2 className="home__welcome">Bienvenue,</h2>

          <h3 className="home__title">
            Je transforme des idées en <span>applications web</span> modernes et performantes.
          </h3>

          <div className="home__buttons">
           <a
              href="/cv/Mohamed_Zemouchi_CV.pdf"
              download
              className="home__button"
              aria-label="Télécharger mon CV"
            >
              <FaDownload />
              CV
          </a>

            <Link to="/projects" className="home__button">
            <FaLaptopCode />
              Projets
            </Link>
          </div>

          <p className="home__description">
            Développeur web, je conçois des
            applications modernes, accessibles et centrées sur les besoins
            utilisateurs.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Home;