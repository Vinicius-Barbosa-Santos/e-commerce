import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CartItemVisual } from "@/components/cart-item-visual";
import { priceFormatter } from "@/utils/formatter";
import { useGlobalContext } from "@/context/global";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const Cart = () => {
  const { updateCartItem } = useGlobalContext();
  const { cart, deleteCart } = useGlobalContext();

  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleFinishOrder = () => {
    navigate("/");
    toast.success("Pedido finalizado com sucesso!");
  };

  return (
    <div className="mt-11">
      <Card className="mx-auto">
        <CardHeader className="border-b">
          <CardTitle className="text-muted-foreground grid grid-cols-3 text-xs sm:grid-cols-[1fr_160px_200px] sm:text-sm">
            <span>Produto</span>
            <span className="text-center">Qtd</span>
            <span className="text-right">Subtotal</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {cart.length === 0 ? (
            <p className="text-muted-foreground">Seu carrinho está vazio.</p>
          ) : (
            cart.map((item) => (
              <CartItemVisual
                key={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onDecrease={() => {
                  const next = item.quantity - 1;
                  if (next <= 0) {
                    deleteCart(item.id);
                  } else {
                    updateCartItem({ id: item.id, quantity: next });
                  }
                }}
                onIncrease={() =>
                  updateCartItem({ id: item.id, quantity: item.quantity + 1 })
                }
                onRemove={() => deleteCart(item.id)}
              />
            ))
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-3 border-t sm:flex-row sm:items-center sm:justify-between">
          <Button
            onClick={handleFinishOrder}
            className="w-full cursor-pointer rounded-lg sm:w-auto"
          >
            Finalizar pedido
          </Button>
          <div className="flex items-baseline justify-end gap-2">
            <span className="text-muted-foreground text-sm">Total</span>
            <span className="text-2xl font-semibold">
              {priceFormatter.format(total)}
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
