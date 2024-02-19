import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { productCategroyLinks } from "@/utils/store-links";
import { Button } from "../ui/button";
export default function Sidebar() {
  return (
    <aside className="py-4 px-8 h-full fixed w-1/6">
      <h1 className="text-2xl">logo</h1>
      <div className="mt-20 flex flex-col justify-start items-stretch">
        <Accordion type="single" collapsible>
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
                      <span className="capitalize">{link.title}</span>
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
