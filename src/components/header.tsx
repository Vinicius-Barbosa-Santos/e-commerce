import { useGlobalContext } from "@/context/global";
import { Footprints } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  const { cart } = useGlobalContext();

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <Link
        to="/"
        aria-label="Voltar para a página inicial"
        className="flex items-center gap-2.5"
      >
        <h1 className="text-xl font-bold text-white sm:text-2xl">
          Rocketshoes
        </h1>
        <Footprints color="white" className="h-5 w-5 sm:h-6 sm:w-6" />
      </Link>

      <Link
        to="/cart"
        className="flex items-center gap-2.5 rounded p-1 text-white focus:ring-2 focus:ring-white/60 focus:outline-none"
        aria-label={`Abrir carrinho: ${cart.length} itens`}
      >
        <div>
          <strong>Meu Carrinho</strong>
        </div>

        <div className="relative">
          <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          <span
            className="bg-destructive absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] leading-none font-bold text-white sm:h-5 sm:min-w-5 sm:text-xs"
            aria-label="Quantidade de itens no carrinho"
          >
            {cart.length}
          </span>
        </div>
        <span className="sr-only">Abrir carrinho</span>
      </Link>
    </header>
  );
};
