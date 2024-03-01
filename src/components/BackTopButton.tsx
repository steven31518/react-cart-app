import buttonImg from "@/assets/img/pngaaa.com-4472526.png";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function BackTopButton({ clssName }: { clssName?: string }) {
  return (
    <Button
      variant={"ghost"}
      className={cn(
        "overflow-hidden rounded-full flex flex-col items-center justify-center w-[60px] h-[60px] bg-muted-foreground shadow-lg transition-all hover:shadow-xl ",
        clssName
      )}
      onClick={() => window.scrollTo(0, 0)}
    >
      <img
        src={buttonImg}
        alt={"TOP"}
        width={20}
        height={20}
        className={cn(
          "h-auto w-auto object-cover transition-all hover:scale-105 aspect-square "
        )}
      />
    </Button>
  );
}
