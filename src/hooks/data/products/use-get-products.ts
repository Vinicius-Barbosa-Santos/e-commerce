import { ProductQueryKeys } from "@/keys/products/queries";
import { api } from "@/services/api";
import type { ProductResponse } from "@/types/ProductResponse";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = () => {
  return useQuery<ProductResponse[]>({
    queryKey: ProductQueryKeys.getAll(),
    queryFn: async () => {
      const { data: products } = await api.get<ProductResponse[]>("/products");
      return products;
    },
  });
};
