import logo from '../../assets/logo-MZ.webp'
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const githubUrl = `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME}`;
const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL;
const email = import.meta.env.VITE_EMAIL;

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return <footer className="footer">
    <div className="footer__content">
      <img className="logo" src={logo} alt="Logo du portfolio de Mohamed Zemouchi"/>
      <small className="footer__content--text">© {currentYear} Mohamed Zemouchi. All rights reserved</small>
    </div>
    
    <nav className="footer__content--links">
      <a
      href={githubUrl}
      className="footer__social-link"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Voir mon profil GitHub"
    >
      <FaGithub />
    </a>

    <a
      href={linkedinUrl}
      className="footer__social-link"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Voir mon profil LinkedIn"
    >
      <FaLinkedin />
    </a>
    <a
      href={`mailto:${email}`}
      className="footer__social-link"
      aria-label="M'envoyer un e-mai"
    >
      <FaEnvelope />
    </a>
      </nav>
    </footer>;
}

export default Footer;