import { Link } from "react-router-dom";
import { productCategroyLinks } from "@/utils/store-links";
import LinksDropdownWrap from "@/components/LinksDropdownWarp";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Droplinks() {
  return (
    <LinksDropdownWrap>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>商品列表</AccordionTrigger>
          <AccordionContent>
            {productCategroyLinks.map((link) => {
              return (
                <DropdownMenuItem key={link.href}>
                  <Link
                    to={link.href}
                    className="flex items-center gap-x-2 w-full"
                  >
                    {link.icon}
                    <span className="capitalize">{link.title}</span>
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <DropdownMenuItem>
        <Link to={"/about"} className="flex items-center gap-x-2 ">
          <span className="capitalize">關於我</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link to={"/email"} className="flex items-center gap-x-2 ">
          <span className="capitalize">聯絡我</span>
        </Link>
      </DropdownMenuItem>
    </LinksDropdownWrap>
  );
}
