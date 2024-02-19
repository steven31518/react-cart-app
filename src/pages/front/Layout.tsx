import { Outlet } from "react-router-dom";
import Navbar from "@/components/front/Navbar";

export default function Layout() {
  return (
    <main className="grid lg:grid-cols-6">
      <div className="lg:col-span-6">
        <Navbar />
      </div>
      <div className="pt-24 px-4 sm:px-8 lg:px-8 lg:col-span-6">
        <Outlet />
      </div>
    </main>
  );
}
