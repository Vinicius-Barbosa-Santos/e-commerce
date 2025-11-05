import { CardItem } from "@/components/card-item";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGlobalContext } from "@/context/global";

export const App = () => {
  const { products, loading } = useGlobalContext();

  return (
    <div className="mt-11 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {loading
        ? Array.from({ length: 8 }).map((_, i) => (
            <Card
              key={`skeleton-${i}`}
              className="flex h-auto items-center justify-center sm:h-[300px]"
            >
              <Skeleton className="h-48 w-full rounded-lg sm:h-[200px]" />
              <div className="mt-2 w-full space-y-2 px-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </Card>
          ))
        : products?.map((product) => (
            <CardItem key={product.id} product={product} />
          ))}
    </div>
  );
};
