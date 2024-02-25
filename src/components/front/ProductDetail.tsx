import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import ArtWork from "@/components/ArtWork";
import CarouselSize from "@/components/CarouselSize";
import CountButton from "./CountButton";
import { Separator } from "../ui/separator";
import BackButton from "../BackButton";
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
          <BackButton />
          <div className="grid grid-rows-[repeat(2,auto)] gap-x-4 gap-y-4 ">
            <div className="grid grid-rows-subgrid row-span-4 lg:row-span-2 px-2 lg:grid-cols-2 gap-4">
              <>
                <ArtWork
                  aspectRatio="portrait"
                  imageUrl={mainImageUrl ? mainImageUrl : data.imageUrl}
                  width={300}
                  className="max-w-sm mx-auto"
                />
                <div className="flex flex-col justify-end items-center px-8 gap-y-2 lg:gap-y-8">
                  <h1 className="text-4xl font-semibold">{data.title}</h1>
                  <p className="text-md">{data.description}</p>
                  <Separator className="my-2" />
                  <p className="text-md">{data.content}</p>
                  <Separator className="my-2" />
                  <p className="text-2xl">
                    NT$:{data.price} /
                    <s className="text-sm ms-1 opacity-75">
                      {data.origin_price}
                    </s>
                  </p>
                </div>
              </>

              <div className="mx-auto">
                {data.imagesUrl.length > 0 && (
                  <CarouselSize
                    imageUrls={data.imagesUrl}
                    pickMainImage={pickMainImage}
                  />
                )}
              </div>

              <div className="flex flex-col justify-end items-center gap-4">
                <CountButton
                  
                  id={data.id}
                  isUseDebounce={false}
                  addCartButton
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    );
}
