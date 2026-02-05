import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/apiClient";
import { ApiResponse } from "../types/api";

export interface Application {
  id: string;
  jobId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentLocation?: string;
  cvUrl: string;
  coverLetterUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  yearsOfExperience?: number;
  currentPosition?: string;
  expectedSalary?: string;
  availabilityDate?: string;
  message?: string;
  status: string;
  adminNotes?: string;
  subscribeToAlerts: boolean;
  alertPreferences?: {
    categories?: string[];
    contractTypes?: string[];
    remoteTypes?: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface SpontaneousApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentLocation?: string;
  cvUrl: string;
  coverLetterUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  desiredPosition: string;
  desiredCategories: string[];
  desiredContractTypes: string[];
  desiredRemoteTypes: string[];
  yearsOfExperience?: number;
  currentPosition?: string;
  expectedSalary?: string;
  availabilityDate?: string;
  message: string;
  status: string;
  adminNotes?: string;
  subscribeToAlerts: boolean;
  sentAlertJobIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface JobAlertSubscription {
  email: string;
  categories?: string[];
  contractTypes?: string[];
  remoteTypes?: string[];
}

const keys = {
  applications: ["applications"] as const,
  application: (id: string) => ["applications", id] as const,
  spontaneous: ["spontaneous-applications"] as const,
  spontaneousDetail: (id: string) => ["spontaneous-applications", id] as const,
  alertSubscriptions: ["job-alert-subscriptions"] as const,
};

// ==================== APPLICATIONS ====================

export function useApplications(filters?: { jobId?: string; status?: string }) {
  return useQuery({
    queryKey: filters ? [...keys.applications, filters] : keys.applications,
    queryFn: async (): Promise<ApiResponse<Application[]>> => {
      const params = new URLSearchParams();
      if (filters?.jobId) params.append("jobId", filters.jobId);
      if (filters?.status) params.append("status", filters.status);

      const queryString = params.toString();
      const url = queryString ? `/applications?${queryString}` : "/applications";

      const { data } = await api.get<ApiResponse<Application[]>>(url);
      return data;
    },
  });
}

export function useApplication(id: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: keys.application(id),
    queryFn: async (): Promise<ApiResponse<Application>> => {
      const { data } = await api.get<ApiResponse<Application>>(`/applications/${id}`);
      return data;
    },
    enabled: options?.enabled !== undefined ? options.enabled : !!id,
  });
}

export function useCreateApplication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post<ApiResponse<Application>>("/applications", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.applications });
    },
  });
}

export function useUpdateApplicationStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status, adminNotes }: { id: string; status: string; adminNotes?: string }) => {
      const { data } = await api.patch<ApiResponse<Application>>(`/applications/${id}/status`, {
        status,
        adminNotes,
      });
      return data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: keys.applications });
      if (data?.data?.id) {
        qc.invalidateQueries({ queryKey: keys.application(data.data.id) });
      }
    },
  });
}

export function useDeleteApplication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete<ApiResponse<void>>(`/applications/${id}`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.applications });
    },
  });
}

// ==================== SPONTANEOUS APPLICATIONS ====================

export function useSpontaneousApplications(filters?: { status?: string }) {
  return useQuery({
    queryKey: filters ? [...keys.spontaneous, filters] : keys.spontaneous,
    queryFn: async (): Promise<ApiResponse<SpontaneousApplication[]>> => {
      const params = new URLSearchParams();
      if (filters?.status) params.append("status", filters.status);

      const queryString = params.toString();
      const url = queryString ? `/applications/spontaneous?${queryString}` : "/applications/spontaneous";

      const { data } = await api.get<ApiResponse<SpontaneousApplication[]>>(url);
      return data;
    },
  });
}

export function useSpontaneousApplication(id: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: keys.spontaneousDetail(id),
    queryFn: async (): Promise<ApiResponse<SpontaneousApplication>> => {
      const { data } = await api.get<ApiResponse<SpontaneousApplication>>(`/applications/spontaneous/${id}`);
      return data;
    },
    enabled: options?.enabled !== undefined ? options.enabled : !!id,
  });
}

export function useCreateSpontaneousApplication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post<ApiResponse<SpontaneousApplication>>("/applications/spontaneous", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.spontaneous });
    },
  });
}

export function useUpdateSpontaneousApplicationStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status, adminNotes }: { id: string; status: string; adminNotes?: string }) => {
      const { data } = await api.patch<ApiResponse<SpontaneousApplication>>(`/applications/spontaneous/${id}/status`, {
        status,
        adminNotes,
      });
      return data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: keys.spontaneous });
      if (data?.data?.id) {
        qc.invalidateQueries({ queryKey: keys.spontaneousDetail(data.data.id) });
      }
    },
  });
}

export function useDeleteSpontaneousApplication() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete<ApiResponse<void>>(`/applications/spontaneous/${id}`);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.spontaneous });
    },
  });
}

// ==================== JOB ALERTS ====================

export function useJobAlertSubscriptions() {
  return useQuery({
    queryKey: keys.alertSubscriptions,
    queryFn: async (): Promise<ApiResponse<any[]>> => {
      const { data } = await api.get<ApiResponse<any[]>>("/job-alerts");
      return data;
    },
  });
}

export function useSubscribeToJobAlerts() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: JobAlertSubscription) => {
      const { data } = await api.post<ApiResponse<any>>("/job-alerts/subscribe", payload);
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: keys.alertSubscriptions });
    },
  });
}

export function useUnsubscribeFromJobAlerts() {
  return useMutation({
    mutationFn: async (email: string) => {
      const { data } = await api.post<ApiResponse<void>>("/job-alerts/unsubscribe", { email });
      return data;
    },
  });
}
