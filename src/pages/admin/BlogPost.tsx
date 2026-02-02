// admin/Posts
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import {
  FileText,
  Search,
  Plus,
  X,
  Loader2,
  Trash2,
  Edit2,
  Clock,
  Calendar,
} from "lucide-react";
import React from "react";

import { useBlogPosts, useCreateBlogPost, useDeleteBlogPost } from "../../api/blogposts";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/Card";
import { BlogPost as BlogPostModel } from "../../types/models";

const BlogPostForm = ({
  post,
  onSave,
  onCancel,
  isSubmitting
}: {
  post?: Partial<BlogPostModel> | null,
  onSave: (data: any) => void,
  onCancel: () => void,
  isSubmitting: boolean
}) => {
   const [formData, setFormData] = useState({
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

   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     onSave({
       title: { fr: formData.titleFr, en: formData.titleEn },
       summary: { fr: formData.summaryFr, en: formData.summaryEn },
       content: { fr: formData.contentFr, en: formData.contentEn },
       slug: formData.slug || formData.titleFr.toLowerCase().replace(/\s+/g, '-'),
       imageUrl: formData.imageUrl,
       tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
       author: "Admin", // default
       publishedAt: new Date().toISOString()
     });
   };

   return (
     <form onSubmit={handleSubmit} className="space-y-4">
       <div className="grid grid-cols-2 gap-4">
         <div>
           <label className="text-sm font-medium">Titre (FR)</label>
           <Input
              value={formData.titleFr}
              onChange={e => setFormData(prev => ({ ...prev, titleFr: e.target.value }))}
              required
           />
         </div>
         <div>
            <label className="text-sm font-medium">Title (EN)</label>
            <Input
               value={formData.titleEn}
               onChange={e => setFormData(prev => ({ ...prev, titleEn: e.target.value }))}
               required
            />
         </div>
       </div>

       <div>
         <label className="text-sm font-medium">Slug</label>
         <Input
            value={formData.slug}
            onChange={e => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            placeholder="mon-super-article"
         />
       </div>

       <div className="grid grid-cols-2 gap-4">
         <div>
           <label className="text-sm font-medium">Résumé (FR)</label>
           <textarea
              className="w-full rounded-md border border-gray-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
              value={formData.summaryFr}
              onChange={e => setFormData(prev => ({ ...prev, summaryFr: e.target.value }))}
              required
           />
         </div>
         <div>
            <label className="text-sm font-medium">Summary (EN)</label>
            <textarea
               className="w-full rounded-md border border-gray-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
               value={formData.summaryEn}
               onChange={e => setFormData(prev => ({ ...prev, summaryEn: e.target.value }))}
               required
            />
         </div>
       </div>

       <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Contenu (FR)</label>
            <textarea
               className="w-full rounded-md border border-gray-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[200px]"
               value={formData.contentFr}
               onChange={e => setFormData(prev => ({ ...prev, contentFr: e.target.value }))}
               required
            />
          </div>
          <div>
             <label className="text-sm font-medium">Content (EN)</label>
             <textarea
                className="w-full rounded-md border border-gray-200 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[200px]"
                value={formData.contentEn}
                onChange={e => setFormData(prev => ({ ...prev, contentEn: e.target.value }))}
                required
             />
          </div>
       </div>

       <div>
         <label className="text-sm font-medium">Tags (séparés par des virgules)</label>
         <Input
            value={formData.tags}
            onChange={e => setFormData(prev => ({ ...prev, tags: e.target.value }))}
            placeholder="React, Tech, Tutorial"
         />
       </div>

       <div>
          <label className="text-sm font-medium">Image URL</label>
          <Input
             value={formData.imageUrl}
             onChange={e => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
          />
       </div>

       <div className="flex justify-end gap-2 pt-4">
         <Button type="button" variant="outline" onClick={onCancel}>Annuler</Button>
         <Button type="submit" isLoading={isSubmitting}>Publier</Button>
       </div>
     </form>
   )
}

function BlogPost() {
  const { data: apiPosts, isLoading } = useBlogPosts();
  const createPost = useCreateBlogPost();
  const deletePost = useDeleteBlogPost();

  const [showNewPostForm, setShowNewPostForm] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    if (searchParams.get("open") === "true") {
      setShowNewPostForm(true);
    }
  }, [searchParams]);

  const handleSave = async (data: any) => {
    await createPost.mutateAsync(data);
    setShowNewPostForm(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      await deletePost.mutateAsync(id);
    }
  }

  const posts = (apiPosts?.data ?? []) as BlogPostModel[];
  const filteredPosts = posts.filter(p =>
    p.title.fr.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.summary.fr.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Articles</h1>
          <p className="text-gray-500">Gérez vos publications.</p>
        </div>
        <Button onClick={() => setShowNewPostForm(true)}>
          <Plus className="w-4 h-4 mr-2" /> Nouvel Article
        </Button>
      </div>

       <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-2">
         <Search className="w-5 h-5 text-gray-400" />
         <input
           placeholder="Rechercher..."
           className="flex-1 outline-none text-sm"
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
         />
       </div>

      <AnimatePresence>
        {showNewPostForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="border-blue-200 bg-blue-50/50 mb-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Nouvel Article</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowNewPostForm(false)}><X className="w-4 h-4" /></Button>
              </CardHeader>
              <CardContent>
                <BlogPostForm
                  onSave={handleSave}
                  onCancel={() => setShowNewPostForm(false)}
                  isSubmitting={createPost.isPending}
                />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="text-center py-20"><Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" /></div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <motion.div
               layout
               key={post.id}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-48 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {post.imageUrl ? (
                      <img src={post.imageUrl} alt={post.title.fr} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <FileText size={32} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                       <h3 className="font-bold text-xl text-gray-900 mb-2">{post.title.fr}</h3>
                       <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => {/* Edit logic */}}><Edit2 className="w-4 h-4 text-blue-600" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)}><Trash2 className="w-4 h-4 text-red-600" /></Button>
                       </div>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-2">{post.summary.fr}</p>

                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                       <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {new Date(post.publishedAt).toLocaleDateString()}</span>
                       <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> 5 min read</span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogPost;
