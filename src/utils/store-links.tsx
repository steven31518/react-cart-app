import { ReactNode } from "react";
import { BadgePlus } from "lucide-react";
import { Flame } from "lucide-react";
import { GlassWater } from "lucide-react";
import { Soup } from "lucide-react";
import { Bird } from "lucide-react";
import { Bell } from "lucide-react";
import { Utensils } from "lucide-react";
import { FileSearch } from "lucide-react";
import meatsImg from "@/assets/img/Meats_General.webp";
import fruitsImg from "@/assets/img/Fruits_Crock_Pot29.webp";
import allCetagoryImg from "@/assets/img/Crock_Pot_Foods.webp";
import vegetablesImg from "@/assets/img/Vegetables_General (1).webp";
import fishesImg from "@/assets/img/Fishes_Crock_Pot.webp";
type NavLink = {
  href: string;
  title: string;
  icon?: ReactNode;
  description?: string;
};

export const transfromCategory = (val: string) => {
  switch (val) {
    case "desserts":
      return {
        name: "我要甜點",
        imageUrl: fruitsImg,
        description: "-吃甜點就是那麼令人開心!-",
      };
    case "hot":
      return {
        name: "熱門商品",
        imageUrl: allCetagoryImg,
        description: "-不知怎麼選擇，往往會有指引出現-",
      };
    case "vegetarian":
      return {
        name: "我要吃素",
        imageUrl: vegetablesImg,
        description: "-吃素是一種生活態度-",
      };
    case "meats":
      return {
        name: "我要吃肉",
        imageUrl: meatsImg,
        description: "-肉能讓我吃飽，但烹飪過得更好-",
      };
    case "seafood":
      return {
        name: "我要吃魚",
        imageUrl: fishesImg,
        description: "-品嘗大海的味道，雖然不是用海水煮的-",
      };
    default:
      return {
        name: "",
        imageUrl: allCetagoryImg,
        description: "",
      };
  }
};

export const productCategroyLinks: NavLink[] = [
  {
    href: "/products/hot",
    title: "熱門料理",
    description: "最多人購買的商品",
    icon: <Flame />,
  },
  {
    href: "/products/meats",
    title: "我要吃肉",
    description: "各式肉類料理",
    icon: <Soup />,
  },
  {
    href: "/products/seafood",
    title: "我要吃魚",
    description: "各式海鮮料理",
    icon: <Bird />,
  },
  {
    href: "/products/vegetarian",
    title: "我要吃素",
    description: "各式素食料理",
    icon: <GlassWater />,
  },
  {
    href: "/products/desserts",
    title: "我要甜點",
    description: "最新上架的商品",
    icon: <BadgePlus />,
  },
  {
    href: "/products",
    title: "全部料理",
    description: "全部商品",
    icon: <Utensils />,
  },
];

export const discountLinks: NavLink[] = [
  {
    href: "/search",
    title: "查詢訂單",
    description: "輸入您的優惠卷代碼",
    icon: <FileSearch />,
  },
  {
    href: "/Promotions",
    title: "最新優惠",
    description: "最新上架的折扣商品",
    icon: <Bell />,
  },
];
