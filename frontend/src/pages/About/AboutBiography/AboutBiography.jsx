function AboutBiography() {
  return (
    <section className="about__section biography" className="about__section biography">
      <h3 id="biography-title">Qui suis-je ?</h3>

      <div className="biography__intro">
        <p>
          Développeur web en reconversion, j'ai
          dirigé jusqu'en 2023 une société spécialisée dans le transport de
          marchandises. Cette expérience entrepreneuriale m'a permis de
          développer des compétences en gestion de projet, prise de décision et
          organisation.
        </p>
      </div>

      <div className="biography__timeline">

        <article className="biography__card">
          <time className="biography__step">2023</time>

          <h4>Une reconversion choisie</h4>

          <p>
            Après plusieurs années dans l'entrepreneuriat, je découvre le
            développement web en autodidacte. La possibilité de concevoir des
            applications modernes et utiles devient rapidement une véritable
            passion.
          </p>
        </article>

        <article className="biography__card">
          <time className="biography__step">2025</time>

          <h4>Formation OpenClassrooms</h4>

          <p>
            En octobre 2025, j'intègre la formation Développeur Web
            d'OpenClassrooms afin d'acquérir une solide maîtrise des technologies
            du développement.
          </p>
        </article>

        <article className="biography__card">
          <span className="biography__step">Aujourd'hui</span>

          <h4>Développeur web</h4>

          <p>
            Je développe des applications web modernes avec React, Node.js,
            Express et MongoDB en accordant une attention particulière aux
            performances, au SEO, à l'accessibilité et à la qualité du code.
          </p>
        </article>

      </div>

      <section className="biography__values">

        <div className="biography__value">
          <h5>Curiosité</h5>
          <p>Comprendre en profondeur les technologies et apprendre continuellement.</p>
        </div>

        <div className="biography__value">
          <h5>Rigueur</h5>
          <p>Produire un code propre, maintenable et évolutif.</p>
        </div>

        <div className="biography__value">
          <h5>Persévérance</h5>
          <p>Trouver des solutions aux problèmes les plus complexes.</p>
        </div>

        <div className="biography__value">
          <h5>Qualité</h5>
          <p>Créer des applications performantes, accessibles et centrées utilisateur.</p>
        </div>

      </section>
    </section>
  );
}

export default AboutBiography;