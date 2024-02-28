import type { Product } from "@/api/adim/products";
import ArtWork from "../ArtWork";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
export default function ProductCard({ data }: { data: Product }) {
  const { imageUrl, category, description, price, origin_price, title, id } =
    data;
  return (
    <Link
      to={`/product/${id}`}
      className="bg-muted p-4 border rounded-md grid grid-rows-subgrid row-span-5 hover:opacity-90 transition-all duration-300 ease-in-out max-w-sm"
    >
      <ArtWork aspectRatio="square" imageUrl={imageUrl} className=""/>
      <div className="flex items-center justify-start">
        <Badge>{category}</Badge>
      </div>
      <p className="font-semibold ">{title}</p>
      <p className="text-xs">{description}</p>
      <p className="">
        NT$:{price}/<s className="text-sm ms-1 opacity-75">{origin_price}</s>
      </p>
    </Link>
  );
}
