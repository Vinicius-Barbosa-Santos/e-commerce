import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { priceFormatter } from "@/utils/formatter";

interface CartItemVisualProps {
  image: string;
  name: string;
  price: number;
  quantity?: number;
  onDecrease?: () => void;
  onIncrease?: () => void;
  onRemove?: () => void;
}

export function CartItemVisual({
  image,
  name,
  price,
  quantity = 1,
  onDecrease,
  onIncrease,
  onRemove,
}: CartItemVisualProps) {
  const subtotal = price * quantity;

  return (
    <Card className="border-none py-4 shadow-none">
      <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-[1fr_160px_200px]">
        <div className="flex items-center gap-4">
          <img
            className="h-16 w-16 rounded-md object-cover sm:h-20 sm:w-20"
            src={image}
            alt={name}
          />
          <div>
            <p className="text-sm leading-tight font-medium sm:text-base">
              {name}
            </p>
            <p className="text-muted-foreground text-xs sm:text-sm">
              {priceFormatter.format(price)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button
            onClick={onDecrease}
            variant="outline"
            size="icon-sm"
            aria-label="Diminuir"
          >
            <Minus />
          </Button>
          <input
            type="number"
            value={quantity}
            onChange={onIncrease}
            readOnly
            className="bg-background h-8 w-14 rounded-md border text-center"
          />
          <Button
            onClick={onIncrease}
            variant="outline"
            size="icon-sm"
            aria-label="Aumentar"
          >
            <Plus />
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium">{priceFormatter.format(subtotal)}</span>
          <Button
            onClick={onRemove}
            variant="ghost"
            size="icon-sm"
            aria-label="Remover"
            disabled={!onRemove}
            className="cursor-pointer"
          >
            <Trash />
          </Button>
        </div>
      </div>
    </Card>
  );
}
