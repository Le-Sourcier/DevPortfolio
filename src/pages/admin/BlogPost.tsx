import { useState } from "react";
import { FileText, Calendar } from "lucide-react";
import { useBlogPosts, useCreateBlogPost, useDeleteBlogPost } from "../../api/blogposts";
import { BlogPost as BlogPostModel } from "../../types/models";
import {
  PageHeader,
  SearchBar,
  EmptyState,
  Modal,
  ModalBody,
  ModalFooter,
  FormField,
  FormInput,
  FormTextarea,
  ActionButton,
  DataCard,
  DataCardTitle,
  DataCardDescription,
  DataCardMeta,
  DataCardTags,
  LoadingScreen,
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
});

export default function BlogPostManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPostModel | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState<BlogPostFormData>(getInitialFormData());

  const { data: postsData, isLoading } = useBlogPosts();
  const createPost = useCreateBlogPost();
  const deletePost = useDeleteBlogPost();

  const posts = (postsData?.data || []) as BlogPostModel[];
  const filteredPosts = posts.filter(p =>
    p.title.fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.title.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const openCreate = () => {
    setEditingPost(null);
    setFormData(getInitialFormData());
    setIsModalOpen(true);
  };

  const openEdit = (post: BlogPostModel) => {
    setEditingPost(post);
    setFormData(getInitialFormData(post));
    setIsModalOpen(true);
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
      author: "Admin",
      publishedAt: new Date().toISOString(),
    };

    await createPost.mutateAsync(payload);
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deletePost.mutateAsync(id);
  };

  const updateField = (field: keyof BlogPostFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Articles"
        description="Gérez vos articles de blog"
        count={posts.length}
        icon={FileText}
        actionLabel="Nouvel article"
        onAction={openCreate}
      />

      {/* Search */}
      <div className="mb-6">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Rechercher un article..."
        />
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
          <EmptyState
            icon={FileText}
            title="Aucun article"
            description={searchTerm ? "Aucun article ne correspond à votre recherche" : "Commencez par rédiger votre premier article"}
            actionLabel="Créer un article"
            onAction={openCreate}
          />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredPosts.map((post, index) => (
            <DataCard
              key={post.id}
              index={index}
              onEdit={() => openEdit(post)}
              onDelete={() => handleDelete(post.id)}
            >
              <DataCardTitle>{post.title.fr}</DataCardTitle>
              <DataCardDescription>{post.summary.fr}</DataCardDescription>

              <DataCardMeta>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(post.publishedAt)}
                </span>
                <span>·</span>
                <span className="text-gray-500 dark:text-gray-400">/{post.slug}</span>
              </DataCardMeta>

              {post.tags.length > 0 && (
                <DataCardTags tags={post.tags} />
              )}
            </DataCard>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPost ? "Modifier l'article" : "Nouvel article"}
        size="xl"
      >
        <form onSubmit={handleSubmit}>
          <ModalBody className="max-h-[70vh]">
            <div className="space-y-5">
              {/* Titles */}
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Titre (FR)" required>
                  <FormInput
                    value={formData.titleFr}
                    onChange={(v) => updateField("titleFr", v)}
                    placeholder="Mon super article"
                    required
                  />
                </FormField>
                <FormField label="Title (EN)" required>
                  <FormInput
                    value={formData.titleEn}
                    onChange={(v) => updateField("titleEn", v)}
                    placeholder="My awesome article"
                    required
                  />
                </FormField>
              </div>

              {/* Slug */}
              <FormField label="Slug" hint="URL de l'article (généré automatiquement si vide)">
                <FormInput
                  value={formData.slug}
                  onChange={(v) => updateField("slug", v)}
                  placeholder="mon-super-article"
                />
              </FormField>

              {/* Summaries */}
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Résumé (FR)" required>
                  <FormTextarea
                    value={formData.summaryFr}
                    onChange={(v) => updateField("summaryFr", v)}
                    placeholder="Un court résumé de l'article..."
                    rows={2}
                    required
                  />
                </FormField>
                <FormField label="Summary (EN)" required>
                  <FormTextarea
                    value={formData.summaryEn}
                    onChange={(v) => updateField("summaryEn", v)}
                    placeholder="A short summary..."
                    rows={2}
                    required
                  />
                </FormField>
              </div>

              {/* Contents */}
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Contenu (FR)" required>
                  <FormTextarea
                    value={formData.contentFr}
                    onChange={(v) => updateField("contentFr", v)}
                    placeholder="Le contenu de l'article en markdown..."
                    rows={8}
                    required
                  />
                </FormField>
                <FormField label="Content (EN)" required>
                  <FormTextarea
                    value={formData.contentEn}
                    onChange={(v) => updateField("contentEn", v)}
                    placeholder="The article content in markdown..."
                    rows={8}
                    required
                  />
                </FormField>
              </div>

              {/* Image & Tags */}
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Image URL">
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
          </ModalBody>

          <ModalFooter>
            <ActionButton variant="secondary" onClick={() => setIsModalOpen(false)}>
              Annuler
            </ActionButton>
            <ActionButton
              type="submit"
              loading={createPost.isPending}
            >
              {editingPost ? "Enregistrer" : "Publier"}
            </ActionButton>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}
