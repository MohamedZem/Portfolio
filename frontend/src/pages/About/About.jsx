import { NavLink, Outlet } from 'react-router-dom';

function About() {
  return (
    <main className="about">
      <h2>À propos</h2>

      <nav className="about-nav">
        <NavLink 
          to="/about"
           end
          className={({ isActive }) => isActive ? 'about-nav__link active' : 'about-nav__link'}
        >
          Biographie
        </NavLink>
        <NavLink 
          to="experience" 
          className={({ isActive }) => isActive ? 'about-nav__link active' : 'about-nav__link'}
        >
          Expérience
        </NavLink>
        <NavLink 
          to="education" 
          className={({ isActive }) => isActive ? 'about-nav__link active' : 'about-nav__link'}
        >
          Formations
        </NavLink>
        <NavLink 
          to="skills" 
          className={({ isActive }) => isActive ? 'about-nav__link active' : 'about-nav__link'}
        >
          Compétences
        </NavLink>
      </nav>

      <div className="about-content">
        <Outlet />
      </div>
    </main>
  );
}

export default About;