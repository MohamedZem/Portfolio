import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaNodeJs, FaGitAlt, FaFigma} from "react-icons/fa";
import { SiSass, SiExpress, SiMongodb, SiPostman, SiJsonwebtokens} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { MdDevices } from "react-icons/md";
import { TbApi } from "react-icons/tb";

function AboutSkills() {
  const skills = {
    frontend: [
      { name: "React", icon: <FaReact aria-hidden="true" /> },
      { name: "HTML5", icon: <FaHtml5 aria-hidden="true" /> },
      { name: "CSS3", icon: <FaCss3Alt aria-hidden="true" /> },
      { name: "JavaScript", icon: <FaJs aria-hidden="true" /> },
      { name: "Responsive Design", icon: <MdDevices aria-hidden="true" /> },
      { name: "Sass", icon: <SiSass aria-hidden="true" /> },
    ],
    backend: [
      { name: "Node.js", icon: <FaNodeJs aria-hidden="true" /> },
      { name: "Express", icon: <SiExpress aria-hidden="true" /> },
      { name: "MongoDB", icon: <SiMongodb aria-hidden="true" /> },
      { name: "REST API", icon: <TbApi aria-hidden="true" /> },
      { name: "JWT", icon: <SiJsonwebtokens aria-hidden="true" /> },
    ],
    tools: [
      { name: "Git", icon: <FaGitAlt aria-hidden="true" /> },
      { name: "VS Code", icon: <VscVscode aria-hidden="true" /> },
      { name: "Figma", icon: <FaFigma aria-hidden="true" /> },
      { name: "Postman", icon: <SiPostman aria-hidden="true" /> },
      { name: "MongoDB Atlas", icon: <SiMongodb aria-hidden="true" /> },
    ],
  };

  return (
    <section className="about__section">
      <h3>Compétences</h3>

      <div className="skills">
        {Object.entries(skills).map(([category, items]) => (
          <article className="skills__category" key={category}>
            <h4>
              {category === "frontend"
                ? "Front-end"
                : category === "backend"
                ? "Back-end"
                : "Outils"}
            </h4>

            <ul className="skills__list">
              {items.map((skill) => (
                <li key={skill.name}>
                  <span className="skills__icon">{skill.icon}</span>
                  <span>{skill.name}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AboutSkills;