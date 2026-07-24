import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { payoutsApi } from "@/api/payoutsApi";
import { AxiosError } from "axios";

export const useMakeWithdrawal = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    any, // returned data
    AxiosError,         // error type
    number,             // variables passed to mutateAsync
    { toastId: string } // context
  >({
    mutationFn: async (amount) => {
      const response = await payoutsApi.requestAgentWithdrawal(amount);

      return response.data;
    },

    onMutate: () => {
      return {
        toastId: toast.loading("Creating Withdrawal request..."),
      };
    },

    onSuccess: (_, __, context: any) => {
      queryClient.invalidateQueries({
        queryKey: ["withdrawalAnalytics"],
      });

      queryClient.invalidateQueries({
        queryKey: ["agentWithdrawalHistory"],
      });

      toast.success("Withdrawal Created Successfully", {
        id: context.toastId,
      });
    },

    onError: (error: any, _, context: any) => {
      toast.error(
        error.response?.data?.message || "Failed to make withdrawal.",
        {
          id: context.toastId,
        }
      );
    },
  });

  const makeWithdrawal = (amount: number) => {
    return mutation.mutateAsync(amount);
  };

  return {
    makeWithdrawal,
    isMakingWithdrawal: mutation.isPending,
  };
};