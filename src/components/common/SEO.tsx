import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noIndex?: boolean;
}

const defaultSEO = {
  siteName: 'DevPortfolio',
  title: 'DevPortfolio - Développeur Full-Stack',
  description: 'Développeur Full-Stack passionné par la création d\'expériences web exceptionnelles. Expertise en React, TypeScript, Node.js et plus.',
  keywords: ['développeur', 'full-stack', 'react', 'typescript', 'node.js', 'web', 'portfolio'],
  image: '/og-image.png',
  url: 'https://devportfolio.com',
  twitterHandle: '@devportfolio',
  author: 'John Doe',
  locale: 'fr_FR',
};

const SEO = ({
  title,
  description = defaultSEO.description,
  keywords = defaultSEO.keywords,
  image = defaultSEO.image,
  url = defaultSEO.url,
  type = 'website',
  author = defaultSEO.author,
  publishedTime,
  modifiedTime,
  section,
  tags,
  noIndex = false,
}: SEOProps) => {
  const fullTitle = title 
    ? `${title} | ${defaultSEO.siteName}` 
    : defaultSEO.title;

  const fullUrl = url.startsWith('http') ? url : `${defaultSEO.url}${url}`;
  const fullImage = image.startsWith('http') ? image : `${defaultSEO.url}${image}`;

  return (
    <Helmet>
      {/* Balises de base */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />

      {/* Contrôle d'indexation */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:site_name" content={defaultSEO.siteName} />
      <meta property="og:locale" content={defaultSEO.locale} />

      {/* Article spécifique (pour les blogs) */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' && section && (
        <meta property="article:section" content={section} />
      )}
      {type === 'article' && tags && tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={defaultSEO.twitterHandle} />
      <meta name="twitter:creator" content={defaultSEO.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type === 'article' ? 'Article' : 'WebSite',
          name: fullTitle,
          description: description,
          url: fullUrl,
          image: fullImage,
          author: {
            '@type': 'Person',
            name: author,
          },
          ...(type === 'article' && publishedTime && {
            datePublished: publishedTime,
            dateModified: modifiedTime || publishedTime,
          }),
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
