import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/apiClient";
import { ApiResponse, Education } from "../types/api";

const keys = {
  all: ["education"] as const,
};

export function useEducation() {
  return useQuery({
    queryKey: keys.all,
    queryFn: async (): Promise<ApiResponse<Education[]>> => {
      const { data } = await api.get<ApiResponse<Education[]>>("/education");
      return data;
    },
  });
}

export function useCreateEducation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<Education, "id">) => {
      const { data } = await api.post<ApiResponse<Education>>(
        "/education",
        payload
      );
      return data;
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
      const { data } = await api.put<ApiResponse<Education>>(
        `/education/${id}`,
        payload
      );
      return data;
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
      const { data } = await api.delete<ApiResponse<void>>(`/education/${id}`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}
