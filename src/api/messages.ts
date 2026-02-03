import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/apiClient";
import { ApiResponse } from "../types/api";

export type MessageStatus = "new" | "read" | "replied" | "archived";

export interface Message {
  id: string;
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message: string;
  status: MessageStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

const keys = {
  all: ["messages"] as const,
  detail: (id: string) => [...keys.all, id] as const,
};

// Get all messages (admin)
export function useMessages() {
  return useQuery({
    queryKey: keys.all,
    queryFn: async (): Promise<ApiResponse<Message[]>> => {
      const { data } = await api.get<ApiResponse<Message[]>>("/messages");
      return data;
    },
  });
}

// Get single message (admin)
export function useMessage(id: string) {
  return useQuery({
    queryKey: keys.detail(id),
    queryFn: async (): Promise<ApiResponse<Message>> => {
      const { data } = await api.get<ApiResponse<Message>>(`/messages/${id}`);
      return data;
    },
    enabled: Boolean(id),
  });
}

// Create a new message (public - from contact form)
export function useCreateMessage() {
  return useMutation({
    mutationFn: async (payload: {
      name: string;
      email: string;
      company?: string;
      projectType?: string;
      budget?: string;
      timeline?: string;
      message: string;
    }) => {
      const { data } = await api.post<ApiResponse<Message>>("/messages", payload);
      return data;
    },
  });
}

// Update message (admin)
export function useUpdateMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      status,
      notes,
    }: {
      id: string;
      status?: MessageStatus;
      notes?: string;
    }) => {
      const { data } = await api.put<ApiResponse<Message>>(`/messages/${id}`, {
        status,
        notes,
      });
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}

// Delete message (admin)
export function useDeleteMessage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete<ApiResponse<void>>(`/messages/${id}`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}
