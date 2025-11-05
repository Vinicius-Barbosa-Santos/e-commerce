import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { CartResponse } from "@/types/CartResponse";
import { CartQueryKeys } from "@/keys/cart/queries";
import { CartMutationKeys } from "@/keys/cart/mutations";

type UpdateVariables = {
  id: number;
  quantity: number;
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  return useMutation<CartResponse, Error, UpdateVariables>({
    mutationKey: CartMutationKeys.update(0),
    mutationFn: async ({ id, quantity }) => {
      const { data } = await api.patch<CartResponse>(`/cart/${id}`, {
        quantity: Math.max(1, quantity),
      });
      return data;
    },
    onSuccess: (updated) => {
      queryClient.setQueryData<CartResponse[]>(
        CartQueryKeys.getAll(),
        (old = []) =>
          old.map((item) => (item.id === updated.id ? updated : item)),
      );
      queryClient.invalidateQueries({ queryKey: CartQueryKeys.getAll() });
    },
  });
};
