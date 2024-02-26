import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bs1Circle } from "react-icons/bs";
import { Bs2Circle } from "react-icons/bs";
import { Bs3Circle } from "react-icons/bs";
import { Outlet } from "react-router-dom";
export default function Layout() {
  const { path, id } = useParams();
  const navigate = useNavigate();
  return (
    <section>
      <div className="flex items-center justify-center py-4 px-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Button
                onClick={() => navigate("/order/check")}
                className="rounded-full"
                disabled={path !== "check"}
              >
                <Bs1Circle />
                <span className="hidden lg:block">確認訂單</span>
              </Button>
            </NavigationMenuItem>
            <Separator className="w-1/2" />
            <NavigationMenuItem>
              <Button
                onClick={() => navigate(`/order/pay/${id}`)}
                className="rounded-full"
                disabled={path !== "pay"}
              >
                <Bs2Circle />
                <span className="hidden lg:block">訂單付款</span>
              </Button>
            </NavigationMenuItem>
            <Separator className="w-1/2" />
            <NavigationMenuItem>
              <Button
                className="rounded-full"
                onClick={() => navigate("/order/success")}
                disabled={path !== "success"}
              >
                <Bs3Circle />
                <span className="hidden lg:block">付款完成</span>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div>
        <Outlet />
      </div>
    </section>
  );
}
