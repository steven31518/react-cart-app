import { Outlet } from "react-router-dom";
import Navbar from "@/components/front/Navbar";
import ClientSidebar from "@/components/front/Sidebar";
export default function Layout() {
  return (
    <main className="grid lg:grid-cols-6">
      <div className="hidden lg:block lg:col-span-1 lg:min-h-screen bg-muted">
        <ClientSidebar />
      </div>
      <div className="lg:col-span-5">
        <Navbar />
        <div className="py-8 px-4 sm:px-4 lg:px-8 ">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
