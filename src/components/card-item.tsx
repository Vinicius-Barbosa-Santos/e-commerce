import type { ProductResponse } from "@/types/ProductResponse";
import { Card } from "./ui/card";
import { priceFormatter } from "@/utils/formatter";
import { useGlobalContext } from "@/context/global";
import { toast } from "sonner";

interface CardItemProps {
  product: ProductResponse;
}

export const CardItem = ({ product }: CardItemProps) => {
  const { addCart } = useGlobalContext();

  const handleAddCart = () => {
    addCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    toast.success("Produto adicionado ao carrinho");
  };

  return (
    <Card className="flex h-auto items-center justify-center sm:h-[300px]">
      <div className="flex flex-col items-center justify-center space-y-4">
        <img
          className="h-48 w-full rounded-lg object-cover sm:h-[200px]"
          src={product.image}
          alt={product.name}
        />
        <h2>{product.name}</h2>
        <div className="flex items-center justify-center space-x-4">
          <p>{priceFormatter.format(product.price)}</p>
          <button
            onClick={handleAddCart}
            className="cursor-pointer rounded-md bg-slate-900 px-4 py-2 text-white"
          >
            Adicionar produto
          </button>
        </div>
      </div>
    </Card>
  );
};
