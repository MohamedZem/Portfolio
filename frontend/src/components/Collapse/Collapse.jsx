import { useId, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

function Collapse({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const contentId = useId();
  const buttonId = useId();

  return (
    <article className={`collapse ${isOpen ? "collapse--open" : ""}`}>
        <button
          id={buttonId}
          className="collapse__header"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={contentId}
        >
          <span>{title}</span>

          <FaChevronDown
            aria-hidden="true"
            className="collapse__icon"
          />
        </button>

      <div
        id={contentId}
        className="collapse__content"
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
      >
        {children}
      </div>
    </article>
  );
}

export default Collapse;