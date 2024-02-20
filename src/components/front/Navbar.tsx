import { Navigation } from "./Navigation";
import ClinetDroplinks from "@/components/front/Droplinks";
import ThemeToggle from "./ThemeToggle";

import Cart from "./Cart";
export default function Navbar() {
  return (
    <nav className="bg-muted py-4 sm:px-16 lg:px-24 px-4 flex items-center justify-between">
      <div className="flex items-center justify-center gap-4">
        <ClinetDroplinks />
        <div className="">
          <Navigation />
        </div>
      </div>
      <div className="flex items-center gap-x-2">
        <ThemeToggle />
        <Cart />
      </div>
    </nav>
  );
}
