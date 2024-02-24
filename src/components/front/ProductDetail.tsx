import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import ArtWork from "@/components/ArtWork";
import CarouselSize from "@/components/CarouselSize";
import CountButton from "./CountButton";
import { Separator } from "../ui/separator";

type Props = {
  id: string;
};

export default function ProductDetail({ id }: Props) {
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
          <div className="grid md:grid-cols-2 grid-rows-[repeat(1,auto)] gap-x-4 gap-y-4">
            <div className="grid grid-rows-subgrid row-span-1 px-2">
              <ArtWork
                aspectRatio="portrait"
                imageUrl={mainImageUrl ? mainImageUrl : data.imageUrl}
              />
            </div>
            <div className="grid grid-rows-subgrid row-span-1 px-4 py-4">
              <div className="flex flex-col justify-around items-center gap-y-4 ">
                <h1 className="text-4xl font-semibold">{data.title}</h1>
                <Separator className="my-2" />
                <div className="mx-auto">
                  {data.imagesUrl.length > 0 && (
                    <CarouselSize
                      imageUrls={data.imagesUrl}
                      pickMainImage={pickMainImage}
                    />
                  )}
                </div>
                <Separator className="my-2" />
                <p className="text-md">{data.description}</p>
                <p className="text-2xl">
                  NT$:{data.price}/
                  <s className="text-sm ms-1 opacity-75">{data.origin_price}</s>
                </p>
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
          </div>
        </section>
      </main>
    );
}
