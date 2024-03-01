import { Outlet } from "react-router-dom";
import Navbar from "@/components/front/Navbar";
import ClientSidebar from "@/components/front/Sidebar";
import BackTopButton from "@/components/BackTopButton";
import FadeIn from "@/components/FadeIn";
export default function Layout() {
  return (
    <main className="grid lg:grid-cols-6">
      <div className="hidden lg:block lg:col-span-1 lg:min-h-screen bg-muted">
        <ClientSidebar />
      </div>
      <div className="lg:col-span-5">
        <Navbar />
        <div className="py-8 px-2 sm:px-4 lg:px-8 mb-12 relative">
          <FadeIn className="fixed z-50 bottom-20 right-5 lg:hidden">
            <BackTopButton />
          </FadeIn>
          <Outlet />
        </div>
      </div>
    </main>
  );
}
