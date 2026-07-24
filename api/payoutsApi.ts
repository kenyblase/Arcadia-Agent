import api from "@/api/apiClient";

export const payoutsApi = {
  getAgentWithdrawalAnalytics: async () => {
    return api.get("/agent/analytics/withdrawal");
  },
  getAgentWithdrawalHistory: async (page: number, limit: number) => {
    return api.get(`/agent/withdrawal/history?page=${page}&limit=${limit}`);
  },
  requestAgentWithdrawal: async (amount: number) => {
    return api.post(`/agent//withdrawal/request`, { amount });
  },
}