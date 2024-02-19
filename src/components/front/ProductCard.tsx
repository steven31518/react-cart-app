import type { Product } from "@/api/adim/products";
import ArtWork from "../ArtWork";
import { Badge } from "../ui/badge";
export default function ProductCard({ data }: { data: Product }) {
  const { imageUrl, category, description, price, origin_price, title } = data;
  return (
    <div className="bg-muted p-4 border rounded-md grid grid-rows-subgrid row-span-6">
      <ArtWork aspectRatio="portrait" imageUrl={imageUrl} />
      <div className="flex items-center justify-start">
        <Badge>{category}</Badge>
      </div>
      <p className="font-bold">{title}</p>
      <p className="text-sm">{description}</p>
      <s>原價:{price}元</s>
      <p>售價:{origin_price}元</p>
    </div>
  );
}
