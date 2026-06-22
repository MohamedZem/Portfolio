import { useState } from "react";
import { sendContactMessage } from "../../services/contactService";

function Contact() {
  const [formData, setFormData] = useState({
    lastname: "",
    firstname: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await sendContactMessage(formData);

      setStatus({
        type: "success",
        message: "Message envoyé avec succès.",
      });

      setFormData({
        lastname: "",
        firstname: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Erreur lors de l'envoi du message.",
      });

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">
      <section className="contact-page__container">
        <div className="contact-page__intro">
          <p className="contact-page__eyebrow">Contact</p>

          <h3>Discutons de votre projet</h3>

          <p>
            Une question, une opportunité d’alternance ou un projet web ?
            Je suis disponible pour échanger.
          </p>

          <div className="contact-page__infos">
  <div className="contact-page__card">
    <span>Disponibilité</span>
    <strong>Alternance</strong>
  </div>

  <div className="contact-page__card">
    <span>Début</span>
    <strong>Septembre 2026</strong>
  </div>
</div>
        </div>

        <form className="contact-page__form" onSubmit={handleSubmit}>
          <div className="contact-page__row">
            <div className="contact-page__field">
              <label htmlFor="lastname">Nom</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-page__field">
              <label htmlFor="firstname">Prénom</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="contact-page__field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact-page__field">
            <label htmlFor="subject">Objet</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact-page__field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          <div className="button">
            <button type="submit" disabled={loading}>
              {loading ? "Envoi..." : "Envoyer le message"}
            </button>
          </div>

          {status && (
            <p
              className={
                status.type === "success"
                  ? "contact-page__message contact-page__message--success"
                  : "contact-page__message contact-page__message--error"
              }
            >
              {status.message}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}

export default Contact;