import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../lib/apiClient";
import { SiteSettings } from "../types/models";

export const useSiteSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const response = await apiClient.get<{ success: boolean; data: SiteSettings }>(
        "/settings"
      );
      return response.data.data;
    },
  });
};

export const useUpdateSiteSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<SiteSettings>) => {
      const response = await apiClient.put<{ success: boolean; data: SiteSettings }>(
        "/settings",
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
};
