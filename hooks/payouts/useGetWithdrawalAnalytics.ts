import { useQuery } from '@tanstack/react-query';
import { payoutsApi } from "@/api/payoutsApi";
import toast from 'react-hot-toast';

const getWithdrawalAnalytics = async () => {
  try {
    const res = await payoutsApi.getAgentWithdrawalAnalytics();
    return  res.data.data
  } catch (error: any) {
    toast.error( error.response?.data?.message || 'Error Fetching Analytics')
  }
};

export const useGetWithdrawaldAnalytics = () => {

  return useQuery({
    queryKey: ['withdrawalAnalytics'],
    queryFn: async () => {
      return await getWithdrawalAnalytics();
    },
    placeholderData: (prev) => prev,
  });
};