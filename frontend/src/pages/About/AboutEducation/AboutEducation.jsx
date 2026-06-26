import { FaGraduationCap } from "react-icons/fa";

function AboutEducation() {
  return (
    <section className="about__section education" aria-labelledby="education-title">
      <h3 id="education-title">Formations</h3>

      <div className="education__list">
        <article className="education__item education__item--featured">
          <div className="education__badge">
            <FaGraduationCap aria-hidden="true"/>
          </div>

          <time className="education__date">2026</time>
          <h4>Développeur Web</h4>
          <p className="education__school">OpenClassrooms</p>

          <p className="education__details">
            Formation orientée vers le développement d'applications web modernes,
            couvrant le front-end et le back-end à travers des projets
            professionnalisants.
          </p>
        </article>

        <article className="education__item">
          <time className="education__date">2024 - 2025</time>
          <h4>Bachelor Développeur Mobile iOS</h4>
          <p className="education__school">Studi</p>

          <p className="education__details">
            Formation spécialisée dans le développement d'applications mobiles
            pour l'écosystème Apple, avec Swift, SwiftUI et les bonnes pratiques
            de conception mobile.
          </p>
        </article>

        <article className="education__item">
          <time className="education__date">2023 - 2024</time>
          <h4>Bases du Web et du Développement</h4>
          <p className="education__school">Auto-formation</p>

          <p className="education__details">
            Acquisition des fondamentaux du développement web : HTML5, CSS3,
            JavaScript, responsive design et versioning avec Git.
          </p>
        </article>

        <article className="education__item">
          <time className="education__date">2018</time>
          <h4>Master 1 Histoire</h4>
          <p className="education__school">
            Université Paris 8 Vincennes - Saint-Denis
          </p>

          <p className="education__details">
            Parcours Langues, Espaces, Cultures : Aires culturelles arabophones.
            Formation axée sur l’analyse, la recherche documentaire et la
            compréhension des sociétés arabophones.
          </p>
        </article>
      </div>
    </section>
  );
}

export default AboutEducation;