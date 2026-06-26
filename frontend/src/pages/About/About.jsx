import { NavLink, Outlet } from "react-router-dom";

function About() {
  return (
    <main className="about">

      <section className="about__card">

        <aside className="about__sidebar" aria-label="Sommaire de la page À propos">

          <h2 id="about-title" className="about__heading">
            À propos
          </h2>

          <nav className="about__nav"  aria-label="Navigation de la page À propos">

            <NavLink
              to="/about"
              end
              className={({ isActive }) =>
                isActive
                  ? "about__link about__link--active"
                  : "about__link"
              }
            >
              Biographie
            </NavLink>

            <NavLink
              to="experience"
              className={({ isActive }) =>
                isActive
                  ? "about__link about__link--active"
                  : "about__link"
              }
            >
              Expérience
            </NavLink>

            <NavLink
              to="education"
              className={({ isActive }) =>
                isActive
                  ? "about__link about__link--active"
                  : "about__link"
              }
            >
              Formations
            </NavLink>

            <NavLink
              to="skills"
              className={({ isActive }) =>
                isActive
                  ? "about__link about__link--active"
                  : "about__link"
              }
            >
              Compétences
            </NavLink>

          </nav>

        </aside>

        <section className="about__content"   aria-labelledby="about-title">

          <Outlet />

        </section>

      </section>

    </main>
  );
}

export default About;