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
import { ScrollArea } from "@/components/ui/scroll-area";
import { ClipboardList } from "lucide-react";
import { ArrowLeftCircle } from "lucide-react";
type Props = {
  status?: number;
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
      <SheetContent className="w-full sm:max-w-sm lg:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-xl">購物車</SheetTitle>
          <SheetDescription>
            {status && status > 0
              ? "調整您的商品數量，並成立訂單"
              : "請先加入商品"}
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="w-full h-5/6 max-h-screen px-2">
          {children}
        </ScrollArea>
        <SheetFooter>
          {status && status > 0 ? (
            <SheetClose asChild>
              <Button type="submit" size="icon" className="w-full my-4">
                <ClipboardList />
                成立訂單
              </Button>
            </SheetClose>
          ) : (
            <SheetClose asChild>
              <Button type="submit" size="icon" className="w-full my-4">
                <ArrowLeftCircle />
                前往選購
              </Button>
            </SheetClose>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
