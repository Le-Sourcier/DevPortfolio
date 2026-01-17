import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/apiClient";
import { Skill } from "../types/api";

const keys = {
  all: ["skills"] as const,
};

export function useSkills() {
  return useQuery({
    queryKey: keys.all,
    queryFn: async (): Promise<Skill[]> => {
      const { data } = await api.get("/skills");
      return data;
    },
  });
}

export function useCreateSkill() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<Skill, "id">) => {
      const { data } = await api.post("/skills", payload);
      return data as Skill;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}

export function useUpdateSkill() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...payload }: Partial<Skill> & { id: string }) => {
      const { data } = await api.put(`/skills/${id}`, payload);
      return data as Skill;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}

export function useDeleteSkill() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/skills/${id}`);
      return id;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}
