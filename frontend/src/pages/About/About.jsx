import { NavLink, Outlet } from "react-router-dom";

function About() {
  return (
    <main className="about">

      <section className="about__card">

        <aside className="about__sidebar">

          <h2 className="about__heading">
            À propos
          </h2>

          <nav className="about__nav">

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

        <section className="about__content">

          <Outlet />

        </section>

      </section>

    </main>
  );
}

export default About;