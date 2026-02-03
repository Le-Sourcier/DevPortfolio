import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/apiClient";
import { Comment, CommentStatus } from "../types/models";
import { ApiResponse } from "../types/api";

export type { Comment, CommentStatus };

const keys = {
  all: ["comments"] as const,
  byPost: (blogPostId: string) => [...keys.all, "post", blogPostId] as const,
};

// Get comments for a blog post (public - only approved)
export function useComments(blogPostId: string) {
  return useQuery({
    queryKey: keys.byPost(blogPostId),
    queryFn: async (): Promise<ApiResponse<Comment[]>> => {
      const { data } = await api.get<ApiResponse<Comment[]>>(
        `/comments/post/${blogPostId}`
      );
      return data;
    },
    enabled: Boolean(blogPostId),
  });
}

// Get all comments (admin)
export function useAllComments() {
  return useQuery({
    queryKey: keys.all,
    queryFn: async (): Promise<ApiResponse<Comment[]>> => {
      const { data } = await api.get<ApiResponse<Comment[]>>("/comments");
      return data;
    },
  });
}

// Create a new comment
export function useCreateComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      blogPostId: string;
      parentId?: string;
      authorName: string;
      authorEmail: string;
      content: string;
    }) => {
      const { data } = await api.post<ApiResponse<Comment>>("/comments", payload);
      return data;
    },
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: keys.byPost(variables.blogPostId) });
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}

// Update comment status (admin)
export function useUpdateCommentStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: CommentStatus;
    }) => {
      const { data } = await api.put<ApiResponse<Comment>>(`/comments/${id}`, {
        status,
      });
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}

// Delete comment (admin)
export function useDeleteComment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete<ApiResponse<void>>(`/comments/${id}`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}
