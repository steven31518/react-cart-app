import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRightCircle } from "lucide-react";
import OrderDetail from "./OrderDetail";
import { Separator } from "../ui/separator";

export default function OrderSearch() {
  const setSearchParams = useSearchParams()[1];
  const [search, setSearch] = useState<string>();
  const [searchParams] = useSearchParams();
  const searchId = searchParams.get("search");
  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn(
          "flex items-center justify-center mb-2 border rounded-full p-2 bg-background w-full lg:w-1/2"
        )}
      >
        <Input
          className="text-start text-lg my-auto border-0 p-4  focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="請輸入訂單編號"
        />
        <Button
          size="icon"
          className="rounded-full w-48 p-3"
          onClick={() => {
            setSearchParams((pre) => {
              pre.set("search", search ?? "");
              return pre;
            });
          }}
        >
          <ChevronRightCircle />
          搜尋
        </Button>
      </div>
      <Separator className="mb-6"/>
      <div>{searchId ? <OrderDetail searchParams={searchId} />:"無查詢結果"}</div>
    </div>
  );
}
