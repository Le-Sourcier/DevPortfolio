import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/apiClient";
import { ApiResponse, Skill } from "../types/api";

const keys = {
  all: ["skills"] as const,
};

export function useSkills() {
  return useQuery({
    queryKey: keys.all,
    queryFn: async (): Promise<ApiResponse<Skill[]>> => {
      const { data } = await api.get<ApiResponse<Skill[]>>("/skills");
      return data;
    },
  });
}

export function useCreateSkill() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<Skill, "id">) => {
      const { data } = await api.post<ApiResponse<Skill>>("/skills", payload);
      return data;
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
      const { data } = await api.put<ApiResponse<Skill>>(
        `/skills/${id}`,
        payload
      );
      return data;
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
      const { data } = await api.delete<ApiResponse<void>>(`/skills/${id}`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}
