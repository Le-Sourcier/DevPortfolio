import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../lib/apiClient";

export const useSubscribeNewsletter = () => {
  return useMutation({
    mutationFn: async (data: { email: string }) => {
      const response = await apiClient.post("/newsletter/subscribe", data);
      return response.data;
    },
  });
};

export const useNewsletterSubscribers = () => {
  return useQuery({
    queryKey: ["newsletter-subscribers"],
    queryFn: async () => {
      const response = await apiClient.get<any>("/newsletter");
      return response.data.data;
    },
  });
};
