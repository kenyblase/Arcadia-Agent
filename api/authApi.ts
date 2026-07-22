import api from "@/api/apiClient";

export const authApi = {
    login: async (email: string, password: string) => {
    return api.post("/auth/agent/login", { email, password });
  },
}