import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
type Props = {
  status?: string;
  children: React.ReactNode;
};
export default function SheetWarp({ children, status }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full relative aspect-square p-2 h-12"
        >
          <ShoppingCart className="text-2xl" />
          <Badge className="absolute top-0 left-8 rounded-full bg-red-500">
            {status}
          </Badge>
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-sm lg:max-w-lg">
        <SheetHeader>
          <SheetTitle>購物車</SheetTitle>
          <SheetDescription>
            Make changes here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        {children}
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
