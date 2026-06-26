import { FaTruckMoving, FaStore, FaArrowRight} from "react-icons/fa";

function AboutExperience() {
  return (
    <section className="about__section experience"  aria-labelledby="experience-title">

      <h3 id="experience-title">
        Expériences professionnelles
      </h3>

      <div className="experience__list">

        <article className="experience__card">

          <div className="experience__icon">
            <FaTruckMoving aria-hidden="true" />
          </div>

          <div className="experience__content">

            <time className="experience__date">
              2018 — 2023
            </time>

            <h4>
              Responsable d'une société de transport de marchandises
            </h4>

            <p>
              Gestion d'une entreprise spécialisée dans le transport
              de marchandises. Cette expérience m'a permis de développer des
              compétences solides en gestion de projet, organisation,
              relation client, prise de décision et résolution de problèmes.
            </p>

            <ul className="experience__skills">

              <li>
                <FaArrowRight aria-hidden="true"/>
                Gestion de projet
              </li>

              <li>
                <FaArrowRight aria-hidden="true"/>
                Management
              </li>

              <li>
                <FaArrowRight aria-hidden="true"/>
                Relation client
              </li>

              <li>
                <FaArrowRight aria-hidden="true"/>
                Organisation
              </li>

              <li>
                <FaArrowRight aria-hidden="true"/>
                Résolution de problèmes
              </li>

            </ul>

          </div>

        </article>

        <article className="experience__card">

          <div className="experience__icon">
            <FaStore aria-hidden="true"/>
          </div>

          <div className="experience__content">

            <time className="experience__date">
              2012 — 2018
            </time>

            <h4>
              Équipier de vente (Contrat étudiant)
            </h4>

            <p>
              Accueil et accompagnement des clients, mise en rayon,
              gestion des stocks et participation au bon fonctionnement du
              magasin. Une expérience qui a renforcé mon sens du service,
              mon organisation et mon esprit d'équipe.
            </p>

            <ul className="experience__skills">

              <li>
                <FaArrowRight aria-hidden="true"/>
                Travail en équipe
              </li>

              <li>
                <FaArrowRight aria-hidden="true"/>
                Service client
              </li>

              <li>
                <FaArrowRight aria-hidden="true"/>
                Gestion des stocks
              </li>

              <li>
                <FaArrowRight aria-hidden="true"/>
                Polyvalence
              </li>

            </ul>

          </div>

        </article>

      </div>

    </section>
  );
}

export default AboutExperience;