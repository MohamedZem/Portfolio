import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaNodeJs, FaGitAlt, FaFigma} from "react-icons/fa";
import { SiSass, SiExpress, SiMongodb, SiPostman, SiJsonwebtokens} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { MdDevices } from "react-icons/md";
import { TbApi } from "react-icons/tb";

function AboutSkills() {
  const skills = {
    frontend: [
      { name: "React", icon: <FaReact /> },
      { name: "HTML5", icon: <FaHtml5 /> },
      { name: "CSS3", icon: <FaCss3Alt /> },
      { name: "JavaScript", icon: <FaJs /> },
      { name: "Responsive Design", icon: <MdDevices /> },
      { name: "Sass", icon: <SiSass /> },
    ],
    backend: [
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "Express", icon: <SiExpress /> },
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "REST API", icon: <TbApi /> },
      { name: "JWT", icon: <SiJsonwebtokens /> },
    ],
    tools: [
      { name: "Git", icon: <FaGitAlt /> },
      { name: "VS Code", icon: <VscVscode /> },
      { name: "Figma", icon: <FaFigma /> },
      { name: "Postman", icon: <SiPostman /> },
      { name: "MongoDB Atlas", icon: <SiMongodb /> },
    ],
  };

  return (
    <section className="about__section">
      <h3>Compétences</h3>

      <div className="skills">
        {Object.entries(skills).map(([category, items]) => (
          <div className="skills__category" key={category}>
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
          </div>
        ))}
      </div>
    </section>
  );
}

export default AboutSkills;