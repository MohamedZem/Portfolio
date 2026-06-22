function Modal({ imageUrl, title, onClose }) {
  return (
    <div className="modal" onClick={onClose}>
      <button
        className="modal__close"
        onClick={onClose}
        aria-label="Fermer la modale"
      >
        ×
      </button>

      <img
        src={imageUrl}
        alt={title}
        className="modal__image"
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  );
}

export default Modal;