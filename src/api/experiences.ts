import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/apiClient";
import { ApiResponse, Experience } from "../types/api";

const keys = {
  all: ["experiences"] as const,
};

export function useExperiences() {
  return useQuery({
    queryKey: keys.all,
    queryFn: async (): Promise<ApiResponse<Experience[]>> => {
      const { data } = await api.get<ApiResponse<Experience[]>>("/experiences");
      return data;
    },
  });
}

export function useCreateExperience() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<Experience, "id">) => {
      const { data } = await api.post<ApiResponse<Experience>>(
        "/experiences",
        payload
      );
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}

export function useUpdateExperience() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: Partial<Experience> & { id: string }) => {
      const { data } = await api.put<ApiResponse<Experience>>(
        `/experiences/${id}`,
        payload
      );
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}

export function useDeleteExperience() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete<ApiResponse<void>>(
        `/experiences/${id}`
      );
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}
