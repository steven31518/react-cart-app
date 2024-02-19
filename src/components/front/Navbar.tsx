import { Navigation } from "./Navigation";
import Droplinks from "@/components/front/Droplinks";
import Cart from "./Cart";
export default function Navbar() {
  return (
    <nav className="bg-muted py-4 sm:px-16 lg:px-24 px-4 flex items-center justify-between fixed w-full">
      <div className="flex items-center justify-center gap-4">
        <div className="text-2xl">logo</div>
        <div className="hidden lg:block">
          <Navigation />
        </div>
        <Droplinks />
      </div>
      <div className="flex items-center gap-x-4">
        <div className="flex items-center justify-center gap-4">Theme</div>
        <Cart />
        
      </div>
    </nav>
  );
}
