import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/apiClient";
import { ApiResponse } from "../types/api";

export interface Job {
  id: string;
  title: {
    fr: string;
    en: string;
  };
  slug?: string;
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
  responsibilities?: {
    fr: string;
    en: string;
  };
  benefits: string[];
  tags?: string[];
  featured?: boolean;
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

export interface JobCategory {
  id: string;
  name: {
    fr: string;
    en: string;
  };
  slug: string;
  description?: {
    fr: string;
    en: string;
  };
  icon?: string;
  color: string;
  order: number;
  isActive: boolean;
}

export interface JobContractType {
  id: string;
  name: {
    fr: string;
    en: string;
  };
  slug: string;
  description?: {
    fr: string;
    en: string;
  };
  color: string;
  order: number;
  isActive: boolean;
}

export interface JobRemoteType {
  id: string;
  name: {
    fr: string;
    en: string;
  };
  slug: string;
  description?: {
    fr: string;
    en: string;
  };
  color: string;
  order: number;
  isActive: boolean;
}

export interface JobMetadata {
  categories: JobCategory[];
  contractTypes: JobContractType[];
  remoteTypes: JobRemoteType[];
}

const keys = {
  all: ["jobs"] as const,
  filtered: (filters: JobFilters) => ["jobs", filters] as const,
  detail: (id: string) => ["jobs", id] as const,
  metadata: ["jobs", "metadata"] as const,
  categories: ["jobs", "categories"] as const,
  contractTypes: ["jobs", "contract-types"] as const,
  remoteTypes: ["jobs", "remote-types"] as const,
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

// ==================== METADATA HOOKS ====================

export function useJobMetadata() {
  return useQuery({
    queryKey: keys.metadata,
    queryFn: async (): Promise<ApiResponse<JobMetadata>> => {
      const { data } = await api.get<ApiResponse<JobMetadata>>("/jobs/metadata");
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes - metadata changes rarely
  });
}

export function useJobCategories() {
  return useQuery({
    queryKey: keys.categories,
    queryFn: async (): Promise<ApiResponse<JobCategory[]>> => {
      const { data } = await api.get<ApiResponse<JobCategory[]>>("/jobs/categories");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useJobContractTypes() {
  return useQuery({
    queryKey: keys.contractTypes,
    queryFn: async (): Promise<ApiResponse<JobContractType[]>> => {
      const { data } = await api.get<ApiResponse<JobContractType[]>>("/jobs/contract-types");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useJobRemoteTypes() {
  return useQuery({
    queryKey: keys.remoteTypes,
    queryFn: async (): Promise<ApiResponse<JobRemoteType[]>> => {
      const { data } = await api.get<ApiResponse<JobRemoteType[]>>("/jobs/remote-types");
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
