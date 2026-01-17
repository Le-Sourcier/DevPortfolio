import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/apiClient";
import { Project } from "../types/api";

const keys = {
  all: ["projects"] as const,
};

export function useProjects() {
  return useQuery({
    queryKey: keys.all,
    queryFn: async (): Promise<Project[]> => {
      const { data } = await api.get("/projects");
      return data.data as Project[];
    },
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<Project, "id">) => {
      const { data } = await api.post("/projects", payload);
      return data.data as Project;
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
      const { data } = await api.put(`/projects/${id}`, payload);
      return data.data as Project;
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
      await api.delete(`/projects/${id}`);
      return id;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}
