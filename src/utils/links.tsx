import { AreaChart, Layers, AppWindow } from "lucide-react";
import { ReactNode } from "react";

type NavLink = {
  href: string;
  label: string;
  icon: ReactNode;
};

export const adminNavLinks: NavLink[] = [
  {
    href: "/admin/products",
    label: "Products",
    icon: <AppWindow />,
  },
  {
    href: "/admin/coupons",
    label: "Coupons",
    icon: <Layers />,
  },
  {
    href: "/admin/orders",
    label: "Orders",
    icon: <AreaChart />,
  },
];
