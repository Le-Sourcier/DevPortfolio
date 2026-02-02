import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/apiClient";
import { ApiResponse, BlogPost } from "../types/api";

const keys = {
  all: ["blogposts"] as const,
  detail: (slug: string) => [...keys.all, slug] as const,
};

export function useBlogPosts() {
  return useQuery({
    queryKey: keys.all,
    queryFn: async (): Promise<ApiResponse<BlogPost[]>> => {
      const { data } = await api.get<ApiResponse<BlogPost[]>>("/blogposts");
      return data;
    },
  });
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: keys.detail(slug),
    queryFn: async (): Promise<ApiResponse<BlogPost>> => {
      const { data } = await api.get<ApiResponse<BlogPost>>(
        `/blogposts/${slug}`
      );
      return data;
    },
    enabled: Boolean(slug),
  });
}

export function useCreateBlogPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<BlogPost, "id">) => {
      const { data } = await api.post<ApiResponse<BlogPost>>(
        "/blogposts",
        payload
      );
      return data;
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
      const { data } = await api.put<ApiResponse<BlogPost>>(
        `/blogposts/${id}`,
        payload
      );
      return data;
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
      const { data } = await api.delete<ApiResponse<void>>(`/blogposts/${id}`);

      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}
