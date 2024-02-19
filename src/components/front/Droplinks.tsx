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
      <Accordion
        type="single"
        defaultValue="item-1"
        collapsible={true}
        className="w-full"
      >
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
    </LinksDropdownWrap>
  );
}
