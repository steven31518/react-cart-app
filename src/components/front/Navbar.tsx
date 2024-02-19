import { Navigation } from "./Navigation";
import Droplinks from "@/components/front/Droplinks";

import Cart from "./Cart";
export default function Navbar() {
  return (
    <nav className="bg-muted py-4 sm:px-16 lg:px-24 px-4 flex items-center justify-between">
      <div className="flex items-center justify-center gap-4">
        <Droplinks />
        <div className="">
          <Navigation />
        </div>
      </div>
      <div className="flex items-center gap-x-4">
        <div className="flex items-center justify-center gap-4">Theme</div>
        <Cart />
      </div>
    </nav>
  );
}
