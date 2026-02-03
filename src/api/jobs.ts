import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/apiClient";
import { ApiResponse } from "../types/api";

export interface Job {
  id: string;
  title: {
    fr: string;
    en: string;
  };
  description: {
    fr: string;
    en: string;
  };
  category: string;
  location: string;
  contractType: string;
  remoteType: string;
  salary?: string;
  requirements: string[];
  benefits: string[];
  status: "published" | "draft";
  applicationsCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface JobFilters {
  status?: string;
  category?: string;
  contractType?: string;
  remoteType?: string;
}

const keys = {
  all: ["jobs"] as const,
  filtered: (filters: JobFilters) => ["jobs", filters] as const,
  detail: (id: string) => ["jobs", id] as const,
};

export function useJobs(filters?: JobFilters) {
  return useQuery({
    queryKey: filters ? keys.filtered(filters) : keys.all,
    queryFn: async (): Promise<ApiResponse<Job[]>> => {
      const params = new URLSearchParams();
      if (filters?.status) params.append("status", filters.status);
      if (filters?.category) params.append("category", filters.category);
      if (filters?.contractType) params.append("contractType", filters.contractType);
      if (filters?.remoteType) params.append("remoteType", filters.remoteType);

      const queryString = params.toString();
      const url = queryString ? `/jobs?${queryString}` : "/jobs";

      const { data } = await api.get<ApiResponse<Job[]>>(url);
      return data;
    },
  });
}

export function useJob(id: string) {
  return useQuery({
    queryKey: keys.detail(id),
    queryFn: async (): Promise<ApiResponse<Job>> => {
      const { data } = await api.get<ApiResponse<Job>>(`/jobs/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useCreateJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Omit<Job, "id" | "createdAt" | "updatedAt" | "applicationsCount">) => {
      const { data } = await api.post<ApiResponse<Job>>("/jobs", payload);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}

export function useUpdateJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: Partial<Job> & { id: string }) => {
      const { data } = await api.put<ApiResponse<Job>>(`/jobs/${id}`, payload);
      return data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: keys.all });
      if (data?.data?.id) {
        qc.invalidateQueries({ queryKey: keys.detail(data.data.id) });
      }
    },
  });
}

export function useDeleteJob() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete<ApiResponse<void>>(`/jobs/${id}`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.all });
    },
  });
}

export function useUpdateJobStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "published" | "draft" }) => {
      const { data } = await api.patch<ApiResponse<Job>>(`/jobs/${id}/status`, { status });
      return data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: keys.all });
      if (data?.data?.id) {
        qc.invalidateQueries({ queryKey: keys.detail(data.data.id) });
      }
    },
  });
}
