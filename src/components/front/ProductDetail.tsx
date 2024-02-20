import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import ArtWork from "@/components/ArtWork";
import CarouselSize from "@/components/CarouselSize";
import { Button } from "../ui/button";
import CountButton from "./CountButton";
import { Separator } from "../ui/separator";
import type { PostCart } from "@/api/cart";
import toast from "react-hot-toast";
import { PlusCircle } from "lucide-react";
export default function ProductDetail() {
  const { id } = useParams();
  const [mainImageUrl, setMainImageUrl] = useState<string>("");
  const [qty, setQty] = useState<number>(1);
  const { data, isError, error, isSuccess, isPending } = useQuery({
    queryKey: ["product", id],
    queryFn: () => api.client.getProductWithId(id ?? ""),
    select: (data) => data.product,
  });
  const { mutate, isPending: posting } = useMutation({
    mutationFn: (data: PostCart) => api.client.postToCart(data),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      if (!data.success) toast.error(data.message);
      toast.success("已加入購物車");
    },
  });
  function pickMainImage(url: string) {
    setMainImageUrl(url);
  }
  function count(count: "plus" | "minus") {
    if (count === "plus") {
      setQty((pre) => pre + 1);
    } else if (count === "minus") {
      setQty((pre) => (pre === 1 ? 1 : pre - 1));
    }
  }
  if (isError) return <div>{error.message}</div>;
  if (isPending) return <div>Loading...</div>;
  if (isSuccess)
    return (
      <main>
        <section className="container">
          <div className="grid md:grid-cols-2 grid-rows-[repeat(2,auto)] gap-x-8 gap-y-4">
            <div className="grid grid-rows-subgrid row-span-2 px-2">
              <ArtWork
                aspectRatio="square"
                imageUrl={mainImageUrl ? mainImageUrl : data.imageUrl}
              />

              {data.imagesUrl.length > 0 && (
                <CarouselSize
                  imageUrls={data.imagesUrl}
                  pickMainImage={pickMainImage}
                />
              )}
            </div>
            <div className="grid grid-rows-subgrid row-span-2 px-2">
              <div className="flex flex-col justify-end items-start gap-y-4">
                <div className="flex space-y-2">
                  <p className="text-5xl">{data.title}</p>
                </div>
                <p className="text-xl">{data.description}</p>
                <p className="text-2xl">
                  NT$:{data.price}/
                  <s className="text-sm ms-1 opacity-75">{data.origin_price}</s>
                </p>
                <Separator />
              </div>
              <div className="flex flex-col justify-center items-center gap-4">
                <CountButton count={count} qty={qty} />
                <Button
                  className="w-3/4"
                  disabled={posting}
                  size="icon"
                  onClick={() =>
                    mutate({
                      data: {
                        product_id: data.id,
                        qty: qty,
                      },
                    })
                  }
                >
                  <PlusCircle />
                  <span>{posting ? "加入中..." : "加入購物車"}</span>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
}
