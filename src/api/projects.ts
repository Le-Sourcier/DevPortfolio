import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/apiClient";
import { ApiResponse, Project } from "../types/api";

const keys = {
  all: ["projects"] as const,
};

export function useProjects() {
  return useQuery({
    queryKey: keys.all,
    queryFn: async (): Promise<ApiResponse<Project[]>> => {
      const { data } = await api.get<ApiResponse<Project[]>>("/projects");
      return data;
    },
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<Project, "id">) => {
      const { data } = await api.post<ApiResponse<Project>>(
        "/projects",
        payload
      );
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: Partial<Project> & { id: string }) => {
      const { data } = await api.put<ApiResponse<Project>>(
        `/projects/${id}`,
        payload
      );
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete<ApiResponse<void>>(`/projects/${id}`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}
