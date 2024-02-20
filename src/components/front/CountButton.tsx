import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LuPlus, LuMinus } from "react-icons/lu";
import { cn } from "@/lib/utils";

type Props = {
  count: (count: "plus" | "minus") => void;
  qty: number;
  className?: string;
};
export default function CountButton({ count, qty, className }: Props) {
  return (
    <div
      className={cn(
        "flex items-center justify-center mb-2 border rounded-full p-2",
        className
      )}
    >
      <Button
        variant={"outline"}
        type="button"
        className="rounded-full p-3"
        id="button-plus"
        size="icon"
        onClick={() => count("minus")}
      >
        <LuMinus />
      </Button>
      <Input
        type="number"
        className="text-center text-lg my-auto border-0 p-4  focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder={qty.toString()}
        value={qty}
        readOnly
      />
      <Button
        variant={"outline"}
        type="button"
        className="rounded-full p-3"
        id="button-minus"
        size="icon"
        onClick={() => count("plus")}
      >
        <LuPlus />
      </Button>
    </div>
  );
}
