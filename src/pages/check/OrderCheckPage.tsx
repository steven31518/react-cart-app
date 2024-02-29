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
import { Bs4Circle } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import Order from "@/components/front/Order";
import OrderDetail from "@/components/front/OrderDetail";
import PaymentForm from "@/components/front/PaymentForm";
import PayDoneMsg from "@/components/front/PayDoneMsg";

export default function OrderCheckPage() {
  const searchParams = useSearchParams()[0];
  const stage = searchParams.get("stage");
  const id = searchParams.get("id");
  return (
    <section>
      <div className="flex items-center justify-center py-8  mb-6">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Button className="rounded-full" disabled={!!id}>
                <Bs1Circle />
                <span className="hidden lg:block">確認訂單</span>
              </Button>
            </NavigationMenuItem>
            <Separator className="w-1/2" />
            <NavigationMenuItem>
              <Button
                className="rounded-full"
                disabled={stage !== "paymentCheck"}
              >
                <Bs2Circle />
                <span className="hidden lg:block">成立訂單</span>
              </Button>
            </NavigationMenuItem>
            <Separator className="w-1/2" />
            <NavigationMenuItem>
              <Button
                className="rounded-full"
                disabled={stage !== "payment"}
              >
                <Bs3Circle />
                <span className="hidden lg:block">訂單付款</span>
              </Button>
            </NavigationMenuItem>
            <Separator className="w-1/2" />
            <NavigationMenuItem>
              <Button className="rounded-full" disabled={stage !== "success"}>
                <Bs4Circle />
                <span className="hidden lg:block">付款完成</span>
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <section>
        {!stage && <Order />}
        {id && stage === "success" && (
          <div className="container">
            <PayDoneMsg id={id} />
            <Separator className="my-6" />
          </div>
        )}
        {id && stage === "payment" && (
          <div className="container">
            <h1 className="text-4xl font-semibold mb-6">訂單付款</h1>
            <PaymentForm id={id} />
            <Separator className="my-6" />
          </div>
        )}
        {id &&
          (stage === "paymentCheck" ||
            stage === "success" ||
            stage === "payment") && <OrderDetail searchParams={id} />}
      </section>
    </section>
  );
}
