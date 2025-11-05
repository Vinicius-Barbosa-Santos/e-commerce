import { CartMutationKeys } from "@/keys/cart/mutations";
import { CartQueryKeys } from "@/keys/cart/queries";
import { api } from "@/services/api";
import type { CartResponse } from "@/types/CartResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationKey: CartMutationKeys.delete(0),
    mutationFn: async (id) => {
      await api.delete(`/cart/${id}`);
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData<CartResponse[]>(
        CartQueryKeys.getAll(),
        (oldData: CartResponse[] = []) =>
          oldData.filter((item) => item.id !== id),
      );
      queryClient.invalidateQueries({ queryKey: CartQueryKeys.getAll() });
    },
  });
};
