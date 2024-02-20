import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ArtWork from "../ArtWork";
import CountButton from "./CountButton";
export default function Cart() {
  const { data, isError, isPending, isSuccess, error } = useQuery({
    queryKey: ["getCart", { type: "client" }],
    queryFn: () => api.client.getCart(),
    select: (data) => ({
      carts: data.data.carts,
      total: data.data.total,
      final_total: data.data.final_total,
    }),
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full relative aspect-square p-2 h-12"
        >
          <ShoppingCart className="text-2xl" />
          <Badge className="absolute top-0 left-8 rounded-full bg-red-500">
            {isSuccess ? data.carts.length : 0}
          </Badge>
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-sm lg:max-w-lg">
        <SheetHeader>
          <SheetTitle>購物車</SheetTitle>
          <SheetDescription>
            Make changes here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col justify-center items-center gap-4 px-2 py-4">
          {isPending && <div>Loading...</div>}
          {isError && <div>{error.message}</div>}
          {isSuccess &&
            data.carts.map((cart) => (
              <div className="grid grid-cols-5 gap-4" key={cart.id}>
                <div className="col-span-2">
                  <ArtWork
                    aspectRatio="square"
                    imageUrl={cart.product.imageUrl}
                  />
                </div>
                <div className="col-span-3 flex flex-col items-start justify-end space-y-2">
                  <p>{cart.product.title}</p>
                  <p>{`${cart.qty}
                    ${cart.product.unit} x ${cart.product.price}= NT$ ${cart.total}
                    元`}</p>
                  <p></p>
                  <CountButton count={() => console.log("sd")} qty={1} />
                </div>
              </div>
            ))}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
