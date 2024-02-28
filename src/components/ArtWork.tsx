import { cn } from "@/lib/utils";
interface ArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: "portrait" | "square";
  imageUrl: string;
  width?: number;
  height?: number;
}

export default function ArtWork({
  aspectRatio = "square",
  imageUrl,
  width,
  height,
  className,
  ...props
}: ArtworkProps) {
  return (
    <div className={cn("overflow-hidden rounded-md flex items-center justify-center bg-primary", className)} {...props}>
      <img
        src={imageUrl}
        alt={imageUrl}
        width={width}
        height={height}
        className={cn(
          "h-auto w-auto object-cover transition-all hover:scale-105 ",
          aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
        )}
      />
    </div>
  );
}
