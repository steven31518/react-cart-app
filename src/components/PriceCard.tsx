import type { Cart } from "@/api/cart";
import ArtWork from "./ArtWork";
import { Badge } from "./ui/badge";
export default function PriceCard({ data }: { data: Cart }) {
  return (
    <div className="grid sm:grid-cols-5 gap-4 px-4" key={data.id}>
      <div className="col-span-2">
        <ArtWork
          aspectRatio="square"
          imageUrl={data.product.imageUrl}
          className=""
        />
      </div>
      <div className="col-span-3 flex flex-col items-start justify-center gap-4 ">
        <p>{`品項: ${data.product.title}`}</p>

        {data.coupon?.id ? (
          <>
            <Badge>已套用優惠 {data.coupon?.title}</Badge>
            <s className="text-xs opacity-85">{`總計: ${data.qty}
            ${data.product.unit} x ${data.product.price}= NT$ ${data.total}
            元`}</s>
            <p>{`總計: ${data.qty}
              ${data.product.unit} x ${
              data.product.price * (data.coupon?.percent / 100)
            }= NT$ ${data.final_total}
              元`}</p>
          </>
        ) : (
          <p>{`總計: ${data.qty}
            ${data.product.unit} x ${data.product.price}= NT$ ${data.total}
            元`}</p>
        )}
      </div>
    </div>
  );
}
