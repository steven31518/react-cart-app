import { Link } from "react-router-dom";
import { adminNavLinks } from "@/utils/links";
import { Button } from "../ui/button";

export default function Sidebar() {
  return (
    <aside className="py-4 px-8 h-full">
      <h1>Admin</h1>
      <div className="flex flex-col mt-20 gap-y-4">
        {adminNavLinks.map((link) => (
          <Link key={link.href} to={link.href}>
            <Button variant="link" size="lg">
              {link.icon}
              <span className="capitalize ms-2">{link.label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </aside>
  );
}
