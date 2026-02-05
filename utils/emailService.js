const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  // Check if email is configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠️  Email not configured. Skipping email sending.');
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send application confirmation email to candidate
exports.sendApplicationConfirmation = async (email, firstName, jobTitle) => {
  const transporter = createTransporter();
  if (!transporter) return; // Skip if email not configured

  const mailOptions = {
    from: `"${process.env.COMPANY_NAME || 'DevPortfolio'}" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
    to: email,
    subject: `Confirmation de candidature - ${jobTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Candidature Reçue</h1>
          </div>
          <div class="content">
            <p>Bonjour ${firstName},</p>
            <p>Nous avons bien reçu votre candidature pour le poste de <strong>${jobTitle}</strong>.</p>
            <p>Notre équipe examine actuellement votre profil et vous contactera sous peu si votre candidature correspond à nos besoins.</p>
            <p><strong>Prochaines étapes :</strong></p>
            <ul>
              <li>Examen de votre candidature (sous 48-72h)</li>
              <li>Pré-sélection des candidats</li>
              <li>Entretiens avec les candidats retenus</li>
            </ul>
            <p>Nous vous remercions pour l'intérêt que vous portez à notre entreprise.</p>
            <p>Cordialement,<br>L'équipe Recrutement</p>
          </div>
          <div class="footer">
            <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Send notification to admin about new application
exports.sendApplicationNotificationToAdmin = async ({
  candidateName,
  jobTitle,
  email,
  phone,
  applicationId,
  isSpontaneous = false,
}) => {
  const transporter = createTransporter();
  if (!transporter) return; // Skip if email not configured

  const type = isSpontaneous ? 'Candidature Spontanée' : 'Candidature';
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

  const mailOptions = {
    from: `"${process.env.COMPANY_NAME || 'DevPortfolio'}" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
    to: adminEmail,
    subject: `🔔 Nouvelle ${type} - ${candidateName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-box { background: white; padding: 15px; border-left: 4px solid #667eea; margin: 15px 0; }
          .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 Nouvelle ${type}</h1>
          </div>
          <div class="content">
            <p><strong>Candidat:</strong> ${candidateName}</p>
            <p><strong>Poste:</strong> ${jobTitle}</p>

            <div class="info-box">
              <p><strong>📧 Email:</strong> ${email}</p>
              <p><strong>📱 Téléphone:</strong> ${phone}</p>
            </div>

            <p>Connectez-vous à votre tableau de bord pour voir les détails complets de cette candidature.</p>

            <a href="${process.env.ADMIN_URL || 'http://localhost:3000'}/admin/applications" class="button">
              Voir la Candidature
            </a>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Send job alert to subscribers
exports.sendJobAlert = async (subscriberEmail, jobs, subscriberName = '') => {
  const transporter = createTransporter();
  if (!transporter) return; // Skip if email not configured

  const jobsHTML = jobs.map(job => `
    <div style="background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border: 2px solid #e5e7eb;">
      <h3 style="color: #667eea; margin: 0 0 10px 0;">${job.title.fr}</h3>
      <p style="color: #666; margin: 5px 0;">${job.description.fr}</p>
      <p style="margin: 10px 0;">
        <span style="background: #e0e7ff; padding: 5px 10px; border-radius: 5px; font-size: 12px; margin-right: 5px;">
          📍 ${job.location}
        </span>
        <span style="background: #dbeafe; padding: 5px 10px; border-radius: 5px; font-size: 12px; margin-right: 5px;">
          💼 ${job.contractType}
        </span>
        <span style="background: #fce7f3; padding: 5px 10px; border-radius: 5px; font-size: 12px;">
          🌍 ${job.remoteType}
        </span>
      </p>
      <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/careers/${job.slug || job.id}"
         style="display: inline-block; padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px;">
        Voir l'offre
      </a>
    </div>
  `).join('');

  const mailOptions = {
    from: `"${process.env.COMPANY_NAME || 'DevPortfolio'} Careers" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
    to: subscriberEmail,
    subject: `🎯 ${jobs.length} Nouvelle${jobs.length > 1 ? 's' : ''} Offre${jobs.length > 1 ? 's' : ''} d'Emploi`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f3f4f6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 Nouvelles Opportunités</h1>
          </div>
          <div class="content">
            ${subscriberName ? `<p>Bonjour ${subscriberName},</p>` : '<p>Bonjour,</p>'}
            <p>De nouvelles offres d'emploi correspondant à vos critères viennent d'être publiées !</p>

            ${jobsHTML}

            <p style="margin-top: 30px;">Bonne chance dans votre recherche d'emploi ! 🍀</p>
          </div>
          <div class="footer">
            <p>Vous recevez cet email car vous êtes inscrit aux alertes emploi.</p>
            <p><a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/unsubscribe?email=${subscriberEmail}" style="color: #666;">Se désinscrire</a></p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Send status update email to candidate
exports.sendStatusUpdateEmail = async (candidateEmail, candidateName, jobTitle, newStatus, interviewDetails = null) => {
  const transporter = createTransporter();
  if (!transporter) return;

  let subject = '';
  let content = '';

  switch (newStatus) {
    case 'reviewing':
      subject = `Votre candidature est en cours d'examen - ${jobTitle}`;
      content = `
        <p>Bonjour ${candidateName},</p>
        <p>Nous avons bien examiné votre candidature pour le poste de <strong>${jobTitle}</strong>.</p>
        <p>Nous sommes actuellement en train d'analyser votre profil en détail. Nous vous tiendrons informé(e) de la suite du processus très prochainement.</p>
        <p>Merci pour votre patience.</p>
      `;
      break;

    case 'shortlisted':
      subject = `✨ Vous êtes présélectionné(e) - ${jobTitle}`;
      content = `
        <p>Bonjour ${candidateName},</p>
        <p>Excellente nouvelle ! Votre profil a retenu notre attention pour le poste de <strong>${jobTitle}</strong>.</p>
        <p>Vous faites partie de nos candidats présélectionnés. Nous vous contacterons très prochainement pour organiser un entretien.</p>
        <div style="background: #dbeafe; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #3b82f6;">
          <p style="margin: 0; color: #1e40af; font-weight: bold;">🎯 Prochaine étape : Entretien</p>
          <p style="margin: 5px 0 0 0; color: #1e40af;">Vous recevrez un email avec les détails sous peu.</p>
        </div>
      `;
      break;

    case 'interview':
      subject = `📅 Convocation à un entretien - ${jobTitle}`;
      content = `
        <p>Bonjour ${candidateName},</p>
        <p>Nous sommes ravis de vous inviter à un entretien pour le poste de <strong>${jobTitle}</strong> !</p>
        ${interviewDetails ? `
          <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">📅 Détails de l'entretien</h3>
            ${interviewDetails.date ? `<p><strong>Date :</strong> ${new Date(interviewDetails.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>` : ''}
            ${interviewDetails.time ? `<p><strong>Heure :</strong> ${interviewDetails.time}</p>` : ''}
            ${interviewDetails.duration ? `<p><strong>Durée :</strong> ${interviewDetails.duration}</p>` : ''}
            ${interviewDetails.type ? `<p><strong>Type :</strong> ${interviewDetails.type}</p>` : ''}
            ${interviewDetails.location ? `<p><strong>Lieu :</strong> ${interviewDetails.location}</p>` : ''}
            ${interviewDetails.meetingLink ? `
              <p><strong>Lien de réunion :</strong><br>
                <a href="${interviewDetails.meetingLink}" style="color: #3b82f6; word-break: break-all;">${interviewDetails.meetingLink}</a>
              </p>
            ` : ''}
            ${interviewDetails.notes ? `<p><strong>Notes :</strong> ${interviewDetails.notes}</p>` : ''}
          </div>
        ` : `
          <p>Nous vous contacterons très prochainement pour convenir d'une date et d'une heure.</p>
        `}
        <p>À très bientôt !</p>
      `;
      break;

    case 'accepted':
      subject = `🎉 Félicitations ! Votre candidature est acceptée - ${jobTitle}`;
      content = `
        <p>Bonjour ${candidateName},</p>
        <p>Nous avons le plaisir de vous annoncer que votre candidature pour le poste de <strong>${jobTitle}</strong> a été acceptée ! 🎉</p>
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; border-radius: 10px; margin: 20px 0; text-align: center;">
          <h3 style="margin: 0; font-size: 24px;">🎊 Bienvenue dans l'équipe !</h3>
        </div>
        <p>Nous sommes ravis de vous compter parmi nous. Vous recevrez prochainement un email avec tous les détails concernant votre intégration (date de début, documents à fournir, etc.).</p>
        <p>À très bientôt,<br>L'équipe Recrutement</p>
      `;
      break;

    case 'rejected':
      subject = `Mise à jour de votre candidature - ${jobTitle}`;
      content = `
        <p>Bonjour ${candidateName},</p>
        <p>Nous tenons à vous remercier pour l'intérêt que vous avez porté à notre entreprise et pour le temps que vous avez consacré à votre candidature pour le poste de <strong>${jobTitle}</strong>.</p>
        <p>Après un examen attentif de votre profil, nous avons le regret de vous informer que nous ne pouvons pas donner suite à votre candidature pour ce poste à l'heure actuelle.</p>
        <p>Cette décision ne remet pas en cause vos compétences. Nous avons simplement choisi de poursuivre avec des profils correspondant davantage aux critères spécifiques de ce poste.</p>
        <div style="background: #f3f4f6; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #6366f1;">
          <p style="margin: 0; font-weight: bold;">💡 Nous gardons votre CV dans notre base</p>
          <p style="margin: 5px 0 0 0;">D'autres opportunités pourraient correspondre à votre profil à l'avenir.</p>
        </div>
        <p>Nous vous souhaitons plein succès dans votre recherche d'emploi.</p>
        <p>Cordialement,<br>L'équipe Recrutement</p>
      `;
      break;

    default:
      return; // Don't send email for other statuses
  }

  const mailOptions = {
    from: `"${process.env.COMPANY_NAME || 'DevPortfolio'}" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
    to: candidateEmail,
    subject: subject,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📬 Mise à jour de votre candidature</h1>
          </div>
          <div class="content">
            ${content}
          </div>
          <div class="footer">
            <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Test email configuration
exports.testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    if (!transporter) return false;
    await transporter.verify();
    console.log('✅ Email service is ready');
    return true;
  } catch (error) {
    console.error('❌ Email service error:', error);
    return false;
  }
};
