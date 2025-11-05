import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/services/api";
import { CartMutationKeys } from "@/keys/cart/mutations";
import type { CartResponse } from "@/types/CartResponse";
import { CartQueryKeys } from "@/keys/cart/queries";

export const useAddCart = () => {
  const queryClient = useQueryClient();
  return useMutation<CartResponse, Error, Omit<CartResponse, "id">>({
    mutationKey: CartMutationKeys.add(),
    mutationFn: async (cart) => {
      const existing =
        queryClient.getQueryData<CartResponse[]>(CartQueryKeys.getAll()) ?? [];
      const found = existing.find((item) => item.productId === cart.productId);

      if (found) {
        const { data } = await api.patch<CartResponse>(`/cart/${found.id}`, {
          quantity: Math.max(1, found.quantity + (cart.quantity ?? 1)),
        });
        return data;
      } else {
        const { data } = await api.post<CartResponse>("/cart", cart);
        return data;
      }
    },
    onSuccess: (createdItem) => {
      queryClient.setQueryData<CartResponse[]>(
        CartQueryKeys.getAll(),
        (oldData: CartResponse[] = []) => {
          const exists = oldData.some((item) => item.id === createdItem.id);
          return exists
            ? oldData.map((item) =>
                item.id === createdItem.id ? createdItem : item,
              )
            : [...oldData, createdItem];
        },
      );

      queryClient.invalidateQueries({ queryKey: CartQueryKeys.getAll() });
    },
  });
};
