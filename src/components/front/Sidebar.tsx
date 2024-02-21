import { Link } from "react-router-dom";
import { productCategroyLinks, discountLinks } from "@/utils/store-links";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { SiGerrit } from "react-icons/si";

export default function ClientSidebar() {
  return (
    <aside className="py-6 px-8 h-full fixed w-1/6">
      <Link to="/">
        <div className="flex items-center gap-4 px-4">
          <SiGerrit className="w-10 h-10 text-primary" />
          <h2 className="text-xl font-extrabold text-primary mr-auto">
            PARROT
          </h2>
        </div>
      </Link>

      <div className="mt-10 flex flex-col justify-start items-stretch">
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>商品列表</AccordionTrigger>
            <AccordionContent>
              {productCategroyLinks.map((link) => {
                return (
                  <Link
                    to={link.href}
                    key={link.href}
                    className="flex items-center gap-x-2 w-full"
                  >
                    <Button variant={"link"} className="w-36" size="lg">
                      {link.icon}
                      <span className="capitalize ms-2">{link.title}</span>
                    </Button>
                  </Link>
                );
              })}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>優惠專區</AccordionTrigger>
            <AccordionContent>
              {discountLinks.map((link) => {
                return (
                  <Link
                    to={link.href}
                    key={link.href}
                    className="flex items-center gap-x-2 w-full"
                  >
                    <Button variant={"link"} className="w-36" size="lg">
                      {link.icon}
                      <span className="capitalize ms-2">{link.title}</span>
                    </Button>
                  </Link>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </aside>
  );
}
