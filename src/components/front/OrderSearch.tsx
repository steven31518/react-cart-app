
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRightCircle } from "lucide-react";
export default function OrderSearch() {
  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn(
          "flex items-center justify-center mb-2 border rounded-full p-2 bg-background w-1/2"
        )}
      >
        <Input className="text-center text-lg my-auto border-0 p-4  focus-visible:ring-0 focus-visible:ring-offset-0" />
        <Button size="icon" className="rounded-full w-48 p-3">
          <ChevronRightCircle />
          搜尋
        </Button>
      </div>
      <div></div>
    </div>
  );
}
