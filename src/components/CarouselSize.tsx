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
  orientation?: "horizontal" | "vertical";
};

export default function CarouselSize({
  imageUrls,
  pickMainImage,
  orientation = "horizontal",
}: Prop) {
  return (
    <section>
      <Carousel
        opts={{
          align: "start",
        }}
        orientation={orientation}
        className="sm:max-w-sm"
      >
        <CarouselContent>
          {imageUrls.map((url) => (
            <CarouselItem
              key={url}
              className={cn("basis-1/3", {
                "basis-1/2": imageUrls.length < 3,
                "basis-1/4": imageUrls.length > 3,
              })}
            >
              <Card>
                <CardContent className="flex items-center justify-center p-0">
                  <ArtWork
                    imageUrl={url}
                    aspectRatio="square"
                    onClick={() => (pickMainImage ? pickMainImage(url) : null)}
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center item-center gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </section>
  );
}
