import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from "@/api/dashboardApi";
import toast from 'react-hot-toast';

const getDashboardAnalytics = async () => {
  try {
    const res = await dashboardApi.getDashboardAnalytics();
    return  res.data.data
  } catch (error: any) {
    toast.error( error.response?.data?.message || 'Error Fetching Analytics')
  }
};

export const useGetDashboardAnalytics = () => {

  return useQuery({
    queryKey: ['dashboardAnalytics'],
    queryFn: async () => {
      return await getDashboardAnalytics();
    },
    placeholderData: (prev) => prev,
  });
};