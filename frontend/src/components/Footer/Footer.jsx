import logo from '../../assets/Logo-MZ.png'
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const githubUrl = `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME}`;
const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL;

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return <footer className="footer">
    <div className="footer__content">
      <img className="logo" src={logo} alt="Logo"/>
      <span className="footer__content--text">© {currentYear} Mohamed Zemouchi. All rights reserved</span>
    </div>
    
    <div className="footer__content--links">
      <a
      href={githubUrl}
      className="footer__social-link"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
    >
      <FaGithub />
    </a>

    <a
      href={linkedinUrl}
      className="footer__social-link"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
    >
      <FaLinkedin />
    </a>
    <a
      href="mailto:zemouchi.moh@gmail.com"
      className="footer__social-link"
      aria-label="Envoyer un email"
    >
      <FaEnvelope />
    </a>
      </div>
    </footer>;
}

export default Footer;