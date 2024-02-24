import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import OrderForm from "./OrderForm";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import ArtWork from "../ArtWork";
import { Separator } from "../ui/separator";

export default function Order() {
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
    <main className="py-8 px-4 sm:px-4 lg:px-8">
      <section className="grid grid-cols-1 md:grid-cols-2 place-items-center items-center gap-y-8 ">
        <div className="md:col-span-2 flex justify-center items-center ">
          <p className="text-center p-2 ">還想購物嗎?</p>
          <Link to={"/products"}>
            <Button variant={"link"} className="text-blue-500">
              繼續購物
            </Button>
          </Link>
        </div>
        <div className="flex flex-col justify-center items-end max-w-lg">
          <div className="flex flex-col justify-center items-start gap-8 px-2 py-4 lg:gap-4">
            <h1 className="font-semibold text-4xl mb-6">購物明細</h1>

            {isPending && <div>Loading...</div>}
            {isError && <div>{error.message}</div>}
            {isSuccess &&
              data.carts.map((cart) => (
                <div
                  className="grid grid-cols-5 gap-4 border rounded-md "
                  key={cart.id}
                >
                  <div className="col-span-2">
                    <ArtWork
                      aspectRatio="square"
                      imageUrl={cart.product.imageUrl}
                    />
                  </div>
                  <div className="col-span-3 flex flex-col items-start justify-center gap-4">
                    <p>{`品項: ${cart.product.title}`}</p>
                    <p>{`總計: ${cart.qty}
                  ${cart.product.unit} x ${cart.product.price}= NT$ ${cart.total}
                  元`}</p>
                  </div>
                </div>
              ))}
          </div>
          <Separator />
          {isSuccess && (
            <div className="flex flex-col items-end justify-end mt-2">
              <p>{`小計: NT$ ${data.total} 元`}</p>
              <h1 className="font-semibold text-4xl">
                {`總計: NT$ ${data.final_total} 元`}
              </h1>
            </div>
          )}
        </div>
        {isSuccess && data?.carts.length > 0 ? (
          <OrderForm />
        ) : (
          <div>購物車是空的</div>
        )}
      </section>
    </main>
  );
}
