import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/apiClient";
import { Education } from "../types/api";

const keys = {
  all: ["education"] as const,
};

export function useEducation() {
  return useQuery({
    queryKey: keys.all,
    queryFn: async (): Promise<Education[]> => {
      const { data } = await api.get("/education");
      return data;
    },
  });
}

export function useCreateEducation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<Education, "id">) => {
      const { data } = await api.post("/education", payload);
      return data as Education;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}

export function useUpdateEducation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: Partial<Education> & { id: string }) => {
      const { data } = await api.put(`/education/${id}`, payload);
      return data as Education;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}

export function useDeleteEducation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/education/${id}`);
      return id;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}
