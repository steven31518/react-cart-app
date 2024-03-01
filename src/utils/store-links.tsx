import { ReactNode } from "react";
import { GiSmallFire } from "react-icons/gi";
import { GiMeat } from "react-icons/gi";
import { GiAnglerFish } from "react-icons/gi";
import { GiCarnivorousPlant } from "react-icons/gi";
import { GiCupcake } from "react-icons/gi";
import { Bell } from "lucide-react";
import { GiBallPyramid } from "react-icons/gi";
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

export const productCategroyLinks: NavLink[] = [
  {
    href: "/products/hot",
    title: "熱門料理",
    description: "最多人購買的商品",
    icon: <GiSmallFire size={20} />,
  },
  {
    href: "/products/meats",
    title: "我要吃肉",
    description: "各式肉類料理",
    icon: <GiMeat size={20} />,
  },
  {
    href: "/products/seafood",
    title: "我要吃魚",
    description: "各式海鮮料理",
    icon: <GiAnglerFish size={20} />,
  },
  {
    href: "/products/vegetarian",
    title: "我要吃素",
    description: "各式素食料理",
    icon: <GiCarnivorousPlant size={20} />,
  },
  {
    href: "/products/desserts",
    title: "我要甜點",
    description: "各式甜點",
    icon: <GiCupcake size={20} />,
  },
  {
    href: "/products",
    title: "全部料理",
    description: "全部商品",
    icon: <GiBallPyramid size={20} />,
  },
];

export const discountLinks: NavLink[] = [
  {
    href: "/promotions",
    title: "最新優惠",
    description: "最新上架的折扣商品",
    icon: <Bell />,
  },
];

export const transfromCategory = (val: string) => {
  switch (val) {
    case "desserts":
      return {
        name: "我要甜點",
        imageUrl: fruitsImg,
        description: "- 吃甜點就是那麼令人開心! -",
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
        description: "- 吃素是一種生活態度 -",
      };
    case "meats":
      return {
        name: "我要吃肉",
        imageUrl: meatsImg,
        description: "- 肉能讓我吃飽，但烹飪過會更好 -",
      };
    case "seafood":
      return {
        name: "我要吃魚",
        imageUrl: fishesImg,
        description: "- 品嘗大海的味道，雖然不是用海水煮的 -",
      };
    default:
      return {
        name: "",
        imageUrl: allCetagoryImg,
        description: "- 我甚麼都吃，只要好吃就行 -",
      };
  }
};
