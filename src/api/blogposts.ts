import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/apiClient";
import { BlogPost } from "../types/api";

const keys = {
  all: ["blogposts"] as const,
  detail: (slug: string) => [...keys.all, slug] as const,
};

export function useBlogPosts() {
  return useQuery({
    queryKey: keys.all,
    queryFn: async (): Promise<BlogPost[]> => {
      const { data } = await api.get("/blogposts");
      return data.data as BlogPost[];
    },
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: keys.detail(slug),
    queryFn: async (): Promise<BlogPost> => {
      const { data } = await api.get(`/blogposts/${slug}`);
      return data.data as BlogPost;
    },
    enabled: Boolean(slug),
  });
}

export function useCreateBlogPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<BlogPost, "id">) => {
      const { data } = await api.post("/blogposts", payload);
      return data.data as BlogPost;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}

export function useUpdateBlogPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: Partial<BlogPost> & { id: string }) => {
      const { data } = await api.put(`/blogposts/${id}`, payload);
      return data.data as BlogPost;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}

export function useDeleteBlogPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/blogposts/${id}`);
      return id;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}
