import { FaTruckMoving, FaStore, FaArrowRight} from "react-icons/fa";

function AboutExperience() {
  return (
    <section className="about__section experience">

      <h3>Expériences professionnelles</h3>

      <div className="experience__list">

        <article className="experience__card">

          <div className="experience__icon">
            <FaTruckMoving />
          </div>

          <div className="experience__content">

            <span className="experience__date">
              2018 — 2023
            </span>

            <h4>
              Responsable d'une société de transport de marchandises
            </h4>

            <p>
              Gestion d'une entreprise spécialisée dans le transport
              de marchandises. Cette expérience m'a permis de développer des
              compétences solides en gestion de projet, organisation,
              relation client, prise de décision et résolution de problèmes.
            </p>

            <div className="experience__skills">

              <span>
                <FaArrowRight />
                Gestion de projet
              </span>

              <span>
                <FaArrowRight />
                Management
              </span>

              <span>
                <FaArrowRight />
                Relation client
              </span>

              <span>
                <FaArrowRight />
                Organisation
              </span>

              <span>
                <FaArrowRight />
                Résolution de problèmes
              </span>

            </div>

          </div>

        </article>

        <article className="experience__card">

          <div className="experience__icon">
            <FaStore />
          </div>

          <div className="experience__content">

            <span className="experience__date">
              2012 — 2018
            </span>

            <h4>
              Équipier de vente (Contrat étudiant)
            </h4>

            <p>
              Accueil et accompagnement des clients, mise en rayon,
              gestion des stocks et participation au bon fonctionnement du
              magasin. Une expérience qui a renforcé mon sens du service,
              mon organisation et mon esprit d'équipe.
            </p>

            <div className="experience__skills">

              <span>
                <FaArrowRight />
                Travail en équipe
              </span>

              <span>
                <FaArrowRight />
                Service client
              </span>

              <span>
                <FaArrowRight />
                Gestion des stocks
              </span>

              <span>
                <FaArrowRight />
                Polyvalence
              </span>

            </div>

          </div>

        </article>

      </div>

    </section>
  );
}

export default AboutExperience;