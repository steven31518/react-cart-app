import { Link } from "react-router-dom";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Mail } from "lucide-react";
import { FileSearch } from "lucide-react";
import { ServerCog } from "lucide-react";
export function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="search" className={navigationMenuTriggerStyle()}>
            <FileSearch />
            <span className="hidden lg:block">查詢訂單</span>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="mail" className={navigationMenuTriggerStyle()}>
            <Mail />
            <span className="hidden lg:block">意見反應</span>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="login" className={navigationMenuTriggerStyle()}>
            <ServerCog />
            <span className="hidden lg:block">管理平台</span>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
