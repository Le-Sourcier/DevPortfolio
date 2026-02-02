import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, FileText, Eye, EyeOff } from "lucide-react";
import { useBlogPosts, useCreateBlogPost, useUpdateBlogPost } from "../../api/blogposts";
import { BlogPost as BlogPostModel, BLOG_CATEGORIES, BlogCategory, BlogStatus } from "../../types/models";
import {
  FormField,
  FormInput,
  FormTextarea,
  FormSelect,
  ActionButton,
  LoadingScreen,
  MarkdownEditor,
} from "../../components/admin/ui";

interface BlogPostFormData {
  titleFr: string;
  titleEn: string;
  summaryFr: string;
  summaryEn: string;
  contentFr: string;
  contentEn: string;
  slug: string;
  imageUrl: string;
  tags: string;
  category: BlogCategory;
  status: BlogStatus;
}

const getInitialFormData = (post?: BlogPostModel | null): BlogPostFormData => ({
  titleFr: post?.title?.fr || "",
  titleEn: post?.title?.en || "",
  summaryFr: post?.summary?.fr || "",
  summaryEn: post?.summary?.en || "",
  contentFr: post?.content?.fr || "",
  contentEn: post?.content?.en || "",
  slug: post?.slug || "",
  imageUrl: post?.imageUrl || "",
  tags: post?.tags?.join(", ") || "",
  category: post?.category || "tutorial",
  status: post?.status || "draft",
});

const categoryOptions = BLOG_CATEGORIES.map(c => ({ value: c.value, label: c.labelFr }));
const statusOptions = [
  { value: "draft", label: "Brouillon" },
  { value: "published", label: "Publié" },
];

export default function BlogPostEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = id !== "new";

  const { data: postsData, isLoading } = useBlogPosts();
  const createPost = useCreateBlogPost();
  const updatePost = useUpdateBlogPost();

  const posts = (postsData?.data || []) as BlogPostModel[];
  const currentPost = isEditing ? posts.find(p => p.id === id) : null;

  const [formData, setFormData] = useState<BlogPostFormData>(getInitialFormData());
  const [activeLanguage, setActiveLanguage] = useState<"fr" | "en">("fr");

  useEffect(() => {
    if (currentPost) {
      setFormData(getInitialFormData(currentPost));
    }
  }, [currentPost]);

  const updateField = <K extends keyof BlogPostFormData>(field: K, value: BlogPostFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: { fr: formData.titleFr, en: formData.titleEn },
      summary: { fr: formData.summaryFr, en: formData.summaryEn },
      content: { fr: formData.contentFr, en: formData.contentEn },
      slug: formData.slug || formData.titleFr.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      imageUrl: formData.imageUrl,
      tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
      category: formData.category,
      status: formData.status,
      author: "Admin",
      publishedAt: currentPost?.publishedAt || new Date().toISOString(),
    };

    if (isEditing && currentPost) {
      await updatePost.mutateAsync({ id: currentPost.id, ...payload });
    } else {
      await createPost.mutateAsync(payload);
    }
    navigate("/admin/posts");
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isEditing && !currentPost) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Article non trouvé
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            L'article que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <ActionButton onClick={() => navigate("/admin/posts")}>
            Retour aux articles
          </ActionButton>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate("/admin/posts")}
          className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux articles
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {isEditing ? "Modifier l'article" : "Nouvel article"}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {isEditing ? "Modifiez les informations de votre article" : "Créez un nouvel article de blog"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {formData.status === "draft" ? (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-sm rounded-full">
                <EyeOff className="w-3.5 h-3.5" />
                Brouillon
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm rounded-full">
                <Eye className="w-3.5 h-3.5" />
                Publié
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Meta section */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Informations générales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="Catégorie" required>
              <FormSelect
                value={formData.category}
                onChange={(v) => updateField("category", v as BlogCategory)}
                options={categoryOptions}
                required
              />
            </FormField>
            <FormField label="Statut" required>
              <FormSelect
                value={formData.status}
                onChange={(v) => updateField("status", v as BlogStatus)}
                options={statusOptions}
                required
              />
            </FormField>
            <FormField label="Slug" hint="URL de l'article">
              <FormInput
                value={formData.slug}
                onChange={(v) => updateField("slug", v)}
                placeholder="mon-article"
              />
            </FormField>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <FormField label="Image de couverture">
              <FormInput
                value={formData.imageUrl}
                onChange={(v) => updateField("imageUrl", v)}
                placeholder="https://..."
                type="url"
              />
            </FormField>
            <FormField label="Tags" hint="Séparés par des virgules">
              <FormInput
                value={formData.tags}
                onChange={(v) => updateField("tags", v)}
                placeholder="React, TypeScript, Tutorial..."
              />
            </FormField>
          </div>
        </div>

        {/* Language tabs for content */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="flex border-b border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={() => setActiveLanguage("fr")}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeLanguage === "fr"
                  ? "text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              🇫🇷 Français
            </button>
            <button
              type="button"
              onClick={() => setActiveLanguage("en")}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeLanguage === "en"
                  ? "text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              🇬🇧 English
            </button>
          </div>

          <div className="p-6 space-y-4">
            {activeLanguage === "fr" ? (
              <>
                <FormField label="Titre" required>
                  <FormInput
                    value={formData.titleFr}
                    onChange={(v) => updateField("titleFr", v)}
                    placeholder="Mon super article"
                    required
                  />
                </FormField>
                <FormField label="Résumé" required>
                  <FormTextarea
                    value={formData.summaryFr}
                    onChange={(v) => updateField("summaryFr", v)}
                    placeholder="Un court résumé de l'article..."
                    rows={2}
                    required
                  />
                </FormField>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contenu <span className="text-red-500">*</span>
                  </label>
                  <MarkdownEditor
                    value={formData.contentFr}
                    onChange={(v) => updateField("contentFr", v)}
                    placeholder="Écrivez votre article en Markdown..."
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <FormField label="Title" required>
                  <FormInput
                    value={formData.titleEn}
                    onChange={(v) => updateField("titleEn", v)}
                    placeholder="My awesome article"
                    required
                  />
                </FormField>
                <FormField label="Summary" required>
                  <FormTextarea
                    value={formData.summaryEn}
                    onChange={(v) => updateField("summaryEn", v)}
                    placeholder="A short summary..."
                    rows={2}
                    required
                  />
                </FormField>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <MarkdownEditor
                    value={formData.contentEn}
                    onChange={(v) => updateField("contentEn", v)}
                    placeholder="Write your article in Markdown..."
                    required
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {formData.status === "draft"
              ? "L'article ne sera pas visible tant qu'il n'est pas publié."
              : "L'article est visible publiquement."}
          </p>
          <div className="flex items-center gap-3">
            <ActionButton
              variant="secondary"
              onClick={() => navigate("/admin/posts")}
              type="button"
            >
              Annuler
            </ActionButton>
            <ActionButton
              type="submit"
              loading={createPost.isPending || updatePost.isPending}
              icon={Save}
            >
              {isEditing ? "Enregistrer" : "Créer"}
            </ActionButton>
          </div>
        </div>
      </form>
    </div>
  );
}
