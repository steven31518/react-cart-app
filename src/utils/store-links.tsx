import { ReactNode } from "react";


type NavLink = {
  href: string;
  title: string;
  icon?: ReactNode;
  description?: string;
};

export const productCategroyLinks: NavLink[] = [
  {
    href: "/products/news",
    title: "新品",
    description: "最新上架的商品",
  },
  {
    href: "/products/hot",
    title: "熱門",
    description: "最多人購買的商品",
  },
  {
    href: "/products/drinks",
    title: "飲品",
    description: "各式飲品",
  },
  {
    href: "/products/foods",
    title: "食物",
    description: "各式食物",
  },
  {
    href: "/products/others",
    title: "其他",
    description: "其他商品",
  },
];
