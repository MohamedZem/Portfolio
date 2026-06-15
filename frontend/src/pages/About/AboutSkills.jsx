function AboutSkills() {
  const skills = {
    frontend: ["React", "HTML5", "CSS3", "JavaScript", "Responsive Design", "SASS"],
    backend: ["Node.js", "Express", "MongoDB", "REST API", "Authentication"],
    tools: ["Git", "VS Code", "Figma", "Postman", "MongoDB Atlas"]
  };

  return (
    <section className="about-section">
      <h3>Compétences</h3>
      <div className="skills-grid">
        <div className="skills-category">
          <h4>Front-end</h4>
          <ul className="skills-list">
            {skills.frontend.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div className="skills-category">
          <h4>Back-end</h4>
          <ul className="skills-list">
            {skills.backend.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
        <div className="skills-category">
          <h4>Outils</h4>
          <ul className="skills-list">
            {skills.tools.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AboutSkills;
