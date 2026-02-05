module.exports = function newsletterWelcomeTemplate({
  appName,
  userName,
  supportEmail,
  unsubscribeUrl,
}) {
  const safeName = userName ? userName.trim() : "";
  const greeting = safeName
    ? `Bonjour <strong style="color:#0a7aff;">${safeName}</strong>,`
    : "Bonjour,";
  const contactEmail = supportEmail || "support@nexuscorporat.com";

  return `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${appName} — Bienvenue</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        margin: 0;
        padding: 0;
        background: linear-gradient(135deg, #f4f8ff 0%, #e8f1ff 100%);
        font-family: 'Inter', 'Segoe UI', Roboto, Arial, sans-serif;
        color: #1b2c47;
        line-height: 1.6;
        min-height: 100vh;
      }
      
      .container {
        max-width: 640px;
        margin: 48px auto;
        padding: 0 24px;
      }
      
      .card {
        background: #ffffff;
        border-radius: 24px;
        box-shadow: 
          0 18px 50px rgba(10, 122, 255, 0.18),
          0 4px 20px rgba(10, 122, 255, 0.08);
        overflow: hidden;
        border: 1px solid rgba(10, 122, 255, 0.06);
        position: relative;
      }
      
      .card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #0a7aff, #5b3ee6, #0a7aff);
        background-size: 200% 100%;
        animation: shimmer 3s ease-in-out infinite;
      }
      
      @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
      
      .header {
        padding: 52px 32px 32px;
        border-bottom: 1px solid rgba(10, 122, 255, 0.08);
        text-align: center;
        background: linear-gradient(135deg, #0a7aff, #5b3ee6);
        color: #ffffff;
        position: relative;
        overflow: hidden;
      }
      
      .header::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
        animation: float 6s ease-in-out infinite;
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(180deg); }
      }
      
      .badge {
        display: inline-block;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 12px;
        letter-spacing: 0.45em;
        text-transform: uppercase;
        font-weight: 600;
        margin-bottom: 16px;
        position: relative;
        z-index: 2;
      }
      
      .title {
        margin: 18px 0 0;
        font-size: 32px;
        font-weight: 800;
        letter-spacing: -0.01em;
        line-height: 1.2;
        position: relative;
        z-index: 2;
      }
      
      .content {
        padding: 44px 36px 48px;
        background: #ffffff;
        position: relative;
      }
      
      .greeting {
        font-size: 18px;
        color: #1b2c47;
        margin: 0 0 32px;
        font-weight: 600;
        line-height: 1.4;
      }
      
      .paragraph {
        font-size: 16px;
        color: #405070;
        margin: 0 0 24px;
        line-height: 1.6;
      }
      
      .features {
        list-style: none;
        padding: 0;
        margin: 32px 0 40px;
      }
      
      .feature-item {
        margin-bottom: 20px;
        display: flex;
        gap: 16px;
        align-items: flex-start;
        padding: 16px;
        background: rgba(10, 122, 255, 0.03);
        border-radius: 12px;
        border-left: 3px solid #0a7aff;
        transition: all 0.3s ease;
      }
      
      .feature-item:hover {
        background: rgba(10, 122, 255, 0.08);
        transform: translateX(4px);
      }
      
      .feature-dot {
        flex-shrink: 0;
        margin-top: 2px;
        height: 12px;
        width: 12px;
        border-radius: 50%;
        background: #0a7aff;
        position: relative;
      }
      
      .feature-dot::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 6px;
        height: 6px;
        background: white;
        border-radius: 50%;
      }
      
      .feature-text {
        font-size: 15px;
        color: #405070;
        line-height: 1.5;
        flex: 1;
      }
      
      .highlight-box {
        background: linear-gradient(135deg, rgba(10, 122, 255, 0.05), rgba(91, 43, 225, 0.05));
        border: 1px solid rgba(10, 122, 255, 0.1);
        border-radius: 16px;
        padding: 24px;
        margin: 32px 0;
        text-align: center;
      }
      
      .highlight-text {
        font-size: 15px;
        color: #405070;
        font-weight: 500;
        line-height: 1.5;
      }
      
      .contact {
        font-size: 14px;
        color: #6b7fa8;
        margin: 40px 0 0;
        text-align: center;
        padding-top: 24px;
        border-top: 1px solid rgba(10, 122, 255, 0.1);
      }
      
      .contact-link {
        color: #0a7aff;
        text-decoration: none;
        font-weight: 600;
        transition: color 0.3s ease;
      }
      
      .contact-link:hover {
        color: #5b2be1;
      }
      
      .unsubscribe {
        font-size: 12px;
        color: #6b7fa8;
        margin: 28px 0 0;
        text-align: center;
        padding-top: 20px;
        border-top: 1px solid rgba(10, 122, 255, 0.1);
      }
      
      .unsubscribe-link {
        color: #5b2be1;
        text-decoration: none;
        font-weight: 600;
        transition: color 0.3s ease;
      }
      
      .unsubscribe-link:hover {
        color: #0a7aff;
      }
      
      .footer {
        margin: 32px 0 0;
        font-size: 12px;
        color: #6b7fa8;
        text-align: center;
        opacity: 0.8;
      }
      
      @media (max-width: 600px) {
        .container {
          margin: 24px auto;
          padding: 0 16px;
        }
        
        .header {
          padding: 40px 24px 24px;
        }
        
        .title {
          font-size: 26px;
        }
        
        .content {
          padding: 32px 24px 40px;
        }
        
        .feature-item {
          padding: 14px;
        }
        
        .highlight-box {
          padding: 20px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="card">
        <div class="header">
          <div class="badge">Bienvenue</div>
          <h1 class="title">
            Merci de votre inscription
          </h1>
        </div>
        <div class="content">
          <p class="greeting">
            ${greeting}
          </p>
          <p class="paragraph">
            Bienvenue dans la communauté <strong>${appName}</strong> ! Votre inscription à notre newsletter a été confirmée avec succès.
          </p>
          <p class="paragraph">
            Vous recevrez désormais nos analyses marché exclusives, annonces produit et ressources premium pour garder un temps d'avance dans vos investissements.
          </p>
          
          <div class="highlight-box">
            <p class="highlight-text">
              🚀 <strong>Ce qui vous attend :</strong> Des insights data-driven, des stratégies éprouvées et un accès prioritaire à nos outils d'analyse.
            </p>
          </div>
          
          <ul class="features">
            <li class="feature-item">
              <span class="feature-dot"></span>
              <span class="feature-text"><strong>Analyses exclusives</strong> - Rapports détaillés sur les tendances marché et opportunités émergentes</span>
            </li>
            <li class="feature-item">
              <span class="feature-dot"></span>
              <span class="feature-text"><strong>Alertes intelligentes</strong> - Notifications sur les mouvements importants et signaux trading</span>
            </li>
            <li class="feature-item">
              <span class="feature-dot"></span>
              <span class="feature-text"><strong>Contenu premium</strong> - Accès à nos recherches approfondies et webinaires exclusifs</span>
            </li>
          </ul>
          
          <p class="contact">
            Une question ? Notre équipe est là pour vous aider : 
            <a href="mailto:${contactEmail}" class="contact-link">${contactEmail}</a>
          </p>
          
          <p class="unsubscribe">
            Vous pouvez vous désabonner à tout moment en cliquant sur 
            <a href="${unsubscribeUrl}" class="unsubscribe-link">ce lien</a>
          </p>
        </div>
      </div>
      <p class="footer">
        © ${new Date().getFullYear()} ${appName}. Tous droits réservés.
      </p>
    </div>
  </body>
</html>`;
};
