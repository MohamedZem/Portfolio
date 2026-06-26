import { NavLink } from 'react-router-dom'
import { useEffect, useState } from "react";
import logo from '../../assets/logo-MZ.webp'

function Header() {
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 90) {
        // On descend
        setShowHeader(false);
      } else {
        // On remonte
        setShowHeader(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (

    <header className={`header ${showHeader ? "" : "header--hidden"}`}>
  <div className="header__content">
    <NavLink to="/">
        <img className="header__logo" src={logo} alt="Logo Portfolio" />
        <h1 hidden>Portfolio Zemouchi Mohamed</h1>
    </NavLink>

    <nav className="header__nav" aria-label="Navigation principale">
          <NavLink to="/" className={({ isActive }) => isActive ? "header__link active" : "header__link"}>
            Accueil
          </NavLink>

          <NavLink to="/about" className={({ isActive }) => isActive ? "header__link active" : "header__link"}>
            À propos
          </NavLink>

          <NavLink to="/projects" className={({ isActive }) => isActive ? "header__link active" : "header__link"}>
            Projets
          </NavLink>

          <NavLink to="/contact" className={({ isActive }) => isActive ? "header__link active" : "header__link"}>
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;