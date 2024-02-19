import {
  ClipboardList,
  TicketPercent,
  PackageSearch,
  Store,
} from "lucide-react";
import { ReactNode } from "react";

type NavLink = {
  href: string;
  label: string;
  icon: ReactNode;
};

export const adminNavLinks: NavLink[] = [
  {
    href: "/admin/products",
    label: "產品管理",
    icon: <PackageSearch />,
  },
  {
    href: "/admin/coupons",
    label: "折價卷",
    icon: <TicketPercent />,
  },
  {
    href: "/admin/orders",
    label: "訂單管理",
    icon: <ClipboardList />,
  },
  {
    href: "/",
    label: "返回賣場",
    icon: <Store />,
  },
];
