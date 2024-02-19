import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformCategory(val: string) {
  switch (val) {
    case "news":
      return "新品";
    case "hot":
      return "熱門商品";
    case "drinks":
      return "飲品";
    case "foods":
      return "食品";
    case "others":
      return "其他";
    default:
      return "";
  }
}
