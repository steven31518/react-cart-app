import { ReactNode } from "react";
import { BadgePlus } from 'lucide-react';
import { Flame } from "lucide-react";
import { GlassWater } from "lucide-react";
import { Soup } from "lucide-react";

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
    icon: <BadgePlus />,
  },
  {
    href: "/products/hot",
    title: "熱門",
    description: "最多人購買的商品",
    icon: <Flame />,
  },
  {
    href: "/products/drinks",
    title: "飲品",
    description: "各式飲品",
    icon: <GlassWater />,
  },
  {
    href: "/products/foods",
    title: "食物",
    description: "各式食物",
    icon: <Soup />,
  },
  {
    href: "/products/others",
    title: "其他",
    description: "其他商品",
  },
];
