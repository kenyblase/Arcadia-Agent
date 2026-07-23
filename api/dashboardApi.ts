import api from "@/api/apiClient";

export const dashboardApi = {
  getDashboardAnalytics: async () => {
    return api.get("/agent/analytics/dashboard");
  },
  getAgentCommissionHistory: async (page: number, limit: number) => {
    return api.get(`/agent/commission/history?page=${page}&limit=${limit}`);
  },
}