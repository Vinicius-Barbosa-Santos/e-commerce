import { CartQueryKeys } from "@/keys/cart/queries";
import { api } from "@/services/api";
import type { CartResponse } from "@/types/CartResponse";
import { useQuery } from "@tanstack/react-query";

export const useGetCart = () => {
  return useQuery<CartResponse[]>({
    queryKey: CartQueryKeys.getAll(),
    queryFn: async () => {
      const { data: cart } = await api.get<CartResponse[]>("/cart");
      return cart;
    },
  });
};
