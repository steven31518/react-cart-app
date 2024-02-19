import { adminNavLinks } from "@/utils/links";
import { Link } from "react-router-dom";
import LinksDropdownWrap from "../LinksDropdownWarp";
import { DropdownMenuItem } from "../ui/dropdown-menu";

export default function LinksDropdown() {
  return (
    <LinksDropdownWrap>
      {adminNavLinks.map((link) => {
        return (
          <DropdownMenuItem key={link.href}>
            <Link to={link.href} className="flex items-center gap-x-2 ">
              {link.icon} <span className="capitalize">{link.label}</span>
            </Link>
          </DropdownMenuItem>
        );
      })}
    </LinksDropdownWrap>
  );
}
