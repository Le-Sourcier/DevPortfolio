import { useMutation } from "@tanstack/react-query";
import api from "../lib/apiClient";
import { AuthResponse } from "../types/api";
import { useAuthStore } from "../stores/auth";

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationFn: async (payload: {
      email?: string;
      username?: string;
      password: string;
    }) => {
      const identifier = payload.email || payload.username || "";
      // Backend expects { username, password }
      const { data } = await api.post("/auth/login", {
        username: identifier,
        password: payload.password,
      });
      return data as any;
    },
    onSuccess: (res, variables) => {
      const token = res?.token ?? res?.data?.token;
      const user = res?.user ??
        res?.data?.user ?? {
          id: "",
          email: variables.email || variables.username || "",
        };
      if (!token)
        throw new Error("Token manquant dans la réponse d'authentification");
      setAuth(token, user);
    },
  });
}

export function useRegister() {
  const setAuth = useAuthStore((s) => s.setAuth);
  return useMutation({
    mutationFn: async (payload: {
      email: string;
      password: string;
      name?: string;
    }) => {
      const { data } = await api.post("/auth/register", payload);
      return data as AuthResponse;
    },
    onSuccess: (res) => {
      setAuth(res.token, res.user);
    },
  });
}
