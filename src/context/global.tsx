import constate from "constate";
import { useGetProducts } from "@/hooks/data/products/use-get-products";
import type { ProductResponse } from "@/types/ProductResponse";
import { useGetCart } from "@/hooks/data/cart/use-get-cart";
import { useAddCart } from "@/hooks/data/cart/use-add-cart";
import { useDeleteCart } from "@/hooks/data/cart/use-delete-cart";
import { useUpdateCart } from "@/hooks/data/cart/use-update-cart";

export const useGlobal = () => {
  const { data: cart } = useGetCart();
  const { mutate: addCart } = useAddCart();
  const { mutate: deleteCart } = useDeleteCart();
  const { mutate: updateCartItem } = useUpdateCart();
  const { data: products, isPending: loading } = useGetProducts();

  return {
    loading,
    addCart,
    deleteCart,
    updateCartItem,
    cart: cart ?? [],
    products: (products ?? []) as ProductResponse[],
  };
};

export const [GlobalProvider, useGlobalContext] = constate(useGlobal);
