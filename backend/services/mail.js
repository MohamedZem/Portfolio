const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.RESEND_API_KEY) {
  throw new Error("La variable RESEND_API_KEY est manquante.");
}

const COLORS = {
  beige: "#F4ECE6",
  green: "#4A4E41",
  gold: "#B99D6B",
  black: "#111111",
  gray: "#666666",
};

function formatMessage(message) {
  return message.replace(/\n/g, "<br>");
}

function notificationTemplate({
  firstname,
  lastname,
  email,
  subject,
  message,
}) {
  return `
    <div style="font-family: Arial, sans-serif; background:${COLORS.beige}; padding:30px;">
      <div style="max-width:650px; margin:auto; background:#ffffff; border-radius:16px; overflow:hidden;">

        <div style="background:${COLORS.green}; color:${COLORS.beige}; padding:30px;">
          <h1 style="margin:0; font-size:26px;">Nouveau message</h1>
          <p style="margin:8px 0 0; color:${COLORS.gold};">Portfolio Mohamed Zemouchi</p>
        </div>

        <div style="padding:30px; color:${COLORS.black};">
          <p><strong>Nom :</strong> ${firstname} ${lastname}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Sujet :</strong> ${subject}</p>

          <hr style="border:none; border-top:1px solid #ddd; margin:25px 0;">

          <p style="line-height:1.7;">${formatMessage(message)}</p>
        </div>

      </div>
    </div>
  `;
}

function confirmationTemplate({
  firstname,
  subject,
  message,
}) {
  return `
    <div style="font-family: Arial, sans-serif; background:${COLORS.beige}; padding:30px;">
      <div style="max-width:650px; margin:auto; background:#ffffff; border-radius:16px; overflow:hidden;">

        <div style="background:${COLORS.green}; color:${COLORS.beige}; padding:30px;">
          <h1 style="margin:0; font-size:26px;">Message bien reçu</h1>
          <p style="margin:8px 0 0; color:${COLORS.gold};">
            Mohamed Zemouchi — Développeur Web
          </p>
        </div>

        <div style="padding:30px; color:${COLORS.black};">

          <p>Bonjour ${firstname},</p>

          <p style="line-height:1.7;">
            Merci pour votre message.
            Je l'ai bien reçu et je vous répondrai dans les meilleurs délais.
          </p>

          <hr style="border:none; border-top:1px solid #ddd; margin:25px 0;">

          <p><strong>Sujet :</strong> ${subject}</p>

          <p style="line-height:1.7;">
            ${formatMessage(message)}
          </p>

          <div style="margin-top:30px;">
            <a
              href="${process.env.PORTFOLIO_URL}"
              style="
                display:inline-block;
                background:${COLORS.green};
                color:${COLORS.beige};
                padding:12px 24px;
                border-radius:30px;
                text-decoration:none;
                font-weight:bold;
              "
            >
              Voir mon portfolio
            </a>
          </div>

          <p style="margin-top:35px; color:${COLORS.gray}; font-size:14px;">
            À bientôt,<br>
            <strong>Mohamed Zemouchi</strong><br>
            Développeur Web Full-Stack
          </p>

        </div>

      </div>
    </div>
  `;
}

async function sendContactMail({
  firstname,
  lastname,
  email,
  subject,
  message,
}) {
  // Mail reçu par toi
  await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: process.env.EMAIL_TO,
    replyTo: email,
    subject,
    html: notificationTemplate({
      firstname,
      lastname,
      email,
      subject,
      message,
    }),
  });

  // Mail de confirmation
  await resend.emails.send({
    from: "Mohamed Zemouchi <onboarding@resend.dev>",
    to: email,
    subject: "Votre message a bien été reçu",
    html: confirmationTemplate({
      firstname,
      subject,
      message,
    }),
  });
}

module.exports = {
  sendContactMail,
};