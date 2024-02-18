import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ArtWork from "./ArtWork";
import { cn } from "@/lib/utils";

type Prop = {
  imageUrls: string[];
  pickMainImage?: (url: string) => void;
};

export default function CarouselSize({ imageUrls, pickMainImage }: Prop) {
  return (
    <section>
      <Carousel
        opts={{
          align: "start",
        }}
        className="max-w-sm"
      >
        <CarouselContent>
          {imageUrls.map((url) => (
            <CarouselItem
              key={url}
              className={cn("md:basis-1/2 lg:basis-1/3", {
                "sm:basis-1/2": imageUrls.length === 2,
                "sm:basis-1/3": imageUrls.length >= 3,
              })}
            >
              <div className="">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-0">
                    <ArtWork
                      imageUrl={url}
                      aspectRatio="square"
                      onClick={() =>
                        pickMainImage ? pickMainImage(url) : null
                      }
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center item-center gap-4">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </section>
  );
}
