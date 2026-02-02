import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useBlogPost, useBlogPosts } from "../api/blogposts";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Tag,
  User,
  ArrowRight,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
} from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: apiPost, isLoading, error } = useBlogPost(slug || "");
  const { data: apiPosts } = useBlogPosts();

  const apiPostObj = apiPost?.data as any | undefined;
  const post = apiPostObj
    ? {
        id: apiPostObj.id,
        title: apiPostObj.title?.fr ?? apiPostObj.slug,
        excerpt: apiPostObj.summary?.fr ?? "",
        content: apiPostObj.content?.fr ?? "",
        slug: apiPostObj.slug,
        image: apiPostObj.imageUrl ?? "",
        category: "Général",
        tags: apiPostObj.tags ?? [],
        publishedAt: apiPostObj.publishedAt ?? new Date().toISOString(),
        readTime: 5,
        featured: false,
      }
    : null;

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
        <p>Chargement de l'article...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Article non trouvé
          </h1>
          <Link to="/blog" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  const apiPostList = (apiPosts?.data ?? []) as any[];
  const relatedPosts = apiPostList
    .map((p) => ({
      id: p.id,
      title: p.title?.fr ?? p.slug,
      excerpt: p.summary?.fr ?? "",
      content: p.content?.fr ?? "",
      slug: p.slug,
      image: p.imageUrl ?? "",
      category: "Général",
      tags: p.tags ?? [],
      publishedAt: p.publishedAt ?? new Date().toISOString(),
      readTime: 5,
      featured: false,
    }))
    .filter(
      (p) =>
        p.id !== post.id &&
        (p.category === post.category ||
          p.tags.some((tag: string) => post.tags.includes(tag)))
    )
    .slice(0, 3);

  const shareUrl = window.location.href;
  const shareTitle = post.title;

  const handleShare = (platform: string) => {
    let url = "";
    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareUrl
        )}&text=${encodeURIComponent(shareTitle)}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareUrl
        )}`;
        break;
      case "copy":
        navigator.clipboard.writeText(shareUrl);
        return;
    }
    window.open(url, "_blank", "width=600,height=400");
  };

  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour
          </button>
        </motion.div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-semibold mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span className="font-medium">John Doe</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>
                  {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{post.readTime} min de lecture</span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center space-x-3">
              <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                Partager:
              </span>
              <button
                onClick={() => handleShare("facebook")}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                title="Partager sur Facebook">
                <Facebook className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                title="Partager sur Twitter">
                <Twitter className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare("linkedin")}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                title="Partager sur LinkedIn">
                <Linkedin className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare("copy")}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                title="Copier le lien">
                <Link2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <div className="text-gray-800 dark:text-gray-200 leading-relaxed">
            <p className="text-lg mb-6 first-letter:text-5xl first-letter:font-bold first-letter:text-blue-600 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
              {post.content}
            </p>

            {/* Extended content for demonstration */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Introduction
            </h2>
            <p className="mb-6">
              Dans le monde du développement web moderne, la maîtrise de
              TypeScript avec React est devenue essentielle. Cette combinaison
              offre une robustesse et une maintenabilité exceptionnelles pour
              les applications à grande échelle.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Les avantages clés
            </h2>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li>
                Type safety qui prévient de nombreuses erreurs à l'exécution
              </li>
              <li>IntelliSense amélioré pour une productivité accrue</li>
              <li>Refactoring sûr et efficace</li>
              <li>Documentation vivante du code</li>
              <li>Meilleure collaboration en équipe</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Mise en pratique
            </h2>
            <p className="mb-6">
              L'implémentation de TypeScript dans un projet React nécessite une
              approche méthodique. Commencez par configurer correctement votre
              environnement de développement, puis migrez progressivement vos
              composants existants.
            </p>

            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Code Example</h3>
              <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
                {`interface Props {
  title: string;
  isActive?: boolean;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ title, isActive = false, onClick }) => {
  return (
    <button
      className={isActive ? 'active' : 'inactive'}
      onClick={onClick}
    >
      {title}
    </button>
  );
};`}
              </pre>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
              Conclusion
            </h2>
            <p className="mb-6">
              L'adoption de TypeScript avec React représente un investissement
              stratégique pour tout développeur ou équipe souhaitant créer des
              applications robustes et maintenables. Les bénéfices à long terme
              dépassent largement l'effort d'apprentissage initial.
            </p>
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12">
          <div className="flex items-center mb-4">
            <Tag className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
            <span className="font-semibold text-gray-900 dark:text-white">Tags:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200 cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Author Bio */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 mb-12">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">John Doe</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Développeur Full-Stack avec plus de 5 ans d'expérience dans le
                développement d'applications web modernes. Passionné par React,
                TypeScript et l'architecture software.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-200">
                Me contacter
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-950 py-16 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Articles similaires
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Découvrez d'autres articles qui pourraient vous intéresser
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.article
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 hover-lift group">
                  <div className="relative overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
                        {relatedPost.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="mr-4">
                        {new Date(relatedPost.publishedAt).toLocaleDateString(
                          "fr-FR"
                        )}
                      </span>
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{relatedPost.readTime} min</span>
                    </div>
                    <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                      {relatedPost.excerpt.slice(0, 100)}...
                    </p>
                    <Link
                      to={`/blog/${relatedPost.slug}`}
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-200">
                      Lire l'article
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPost;
