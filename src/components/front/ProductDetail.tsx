import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import ArtWork from "@/components/ArtWork";
import CarouselSize from "@/components/CarouselSize";
import CountButton from "./CountButton";
import { Separator } from "../ui/separator";

export default function ProductDetail() {
  const { id } = useParams();

  const [mainImageUrl, setMainImageUrl] = useState<string>("");

  const { data, isError, error, isSuccess, isPending } = useQuery({
    queryKey: ["product", id],
    queryFn: () => api.client.getProductWithId(id ?? ""),
    select: (data) => data.product,
  });

  function pickMainImage(url: string) {
    setMainImageUrl(url);
  }

  if (isError) return <div>{error.message}</div>;
  if (isPending) return <div>Loading...</div>;
  if (isSuccess)
    return (
      <main>
        <section className="container">
          <div className="grid md:grid-cols-2 grid-rows-[repeat(2,auto)] gap-x-4 gap-y-4">
            <div className="grid grid-rows-subgrid row-span-2 px-2 max-w-lg">
              <ArtWork
                aspectRatio="portrait"
                imageUrl={mainImageUrl ? mainImageUrl : data.imageUrl}
              />
              <div className="mx-auto">
                {data.imagesUrl.length > 0 && (
                  <CarouselSize
                    imageUrls={data.imagesUrl}
                    pickMainImage={pickMainImage}
                  />
                )}
              </div>
            </div>
            <div className="grid grid-rows-subgrid row-span-2 px-8 py-4 rounded-md bg-muted ">
              <div className="flex flex-col justify-center items-start gap-y-4 ">
                <div className="flex space-y-2">
                  <h1 className="text-2xl">{data.title}</h1>
                </div>
                <p className="text-md">{data.description}</p>
                <p className="text-2xl">
                  NT$:{data.price}/
                  <s className="text-sm ms-1 opacity-75">{data.origin_price}</s>
                </p>
              </div>

              <div className="flex flex-col justify-start items-center gap-4">
                <CountButton
                  qty={1}
                  showActiveButton={true}
                  id={data.id}
                  isUseDebounce={false}
                />
              </div>
            </div>
          </div>
            <Separator />
        </section>
      </main>
    );
}
