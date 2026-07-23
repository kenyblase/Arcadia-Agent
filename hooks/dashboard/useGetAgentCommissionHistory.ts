import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from "@/api/dashboardApi";
import toast from 'react-hot-toast';

const getAgentCommissionHistory = async (page: number, limit: number) => {
  try {
    const res = await dashboardApi.getAgentCommissionHistory(page, limit);
    return  res.data.data
  } catch (error: any) {
    toast.error( error.response?.data?.message || 'Error Fetching Admins')
  }
};

export const useGetAgentCommissionHistory = (page=1, limit=10) => {

  return useQuery({
    queryKey: ['agentCommissionHistory', page, limit],
    queryFn: async () => {
      return await getAgentCommissionHistory(page, limit);
    },
    placeholderData: (prev) => prev,
  });
};