import { useState } from "react";
import { sendContactMessage } from "../../services/api";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      await sendContactMessage(formData);
      setStatus({ type: "success", message: "Message envoyé avec succès." });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({ type: "error", message: "Erreur lors de l'envoi du message." });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <h2>Contact</h2>

      <form className="contact__form" onSubmit={handleSubmit}>
        <label htmlFor="name">Nom</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        /> 
 
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit" disabled={loading}>
          {loading ? "Envoi..." : "Envoyer"}
        </button>

        {status && (
          <p className={status.type === "success" ? "success-message" : "error-message"}>
            {status.message}
          </p>
        )}
      </form>
    </main>
  );
}

export default Contact;