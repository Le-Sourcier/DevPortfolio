import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/apiClient";
import { Experience } from "../types/api";

const keys = {
  all: ["experiences"] as const,
};

export function useExperiences() {
  return useQuery({
    queryKey: keys.all,
    queryFn: async (): Promise<Experience[]> => {
      const { data } = await api.get("/experiences");
      return data;
    },
  });
}

export function useCreateExperience() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<Experience, "id">) => {
      const { data } = await api.post("/experiences", payload);
      return data as Experience;
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
      const { data } = await api.put(`/experiences/${id}`, payload);
      return data as Experience;
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
      await api.delete(`/experiences/${id}`);
      return id;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}
