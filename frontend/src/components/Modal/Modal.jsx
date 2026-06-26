import { useEffect } from "react";

function Modal({ imageUrl, title, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-label={`Image agrandie : ${title}`}
      onClick={onClose}
    >
      <button
        className="modal__close"
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        aria-label="Fermer la modale"
      >
        ×
      </button>

      <img
        src={imageUrl}
        alt={`Aperçu agrandi du projet ${title}`}
        className="modal__image"
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  );
}

export default Modal;