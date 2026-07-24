import { useQuery } from '@tanstack/react-query';
import { payoutsApi } from "@/api/payoutsApi";
import toast from 'react-hot-toast';

const getAgentWithdrawalHistory = async (page: number, limit: number) => {
  try {
    const res = await payoutsApi.getAgentWithdrawalHistory(page, limit);
    return  res.data.data
  } catch (error: any) {
    toast.error( error.response?.data?.message || 'Error Fetching Admins')
  }
};

export const useGetAgentWithdrawalHistory = (page=1, limit=10) => {

  return useQuery({
    queryKey: ['agentWithdrawalHistory', page, limit],
    queryFn: async () => {
      return await getAgentWithdrawalHistory(page, limit);
    },
    placeholderData: (prev) => prev,
  });
};