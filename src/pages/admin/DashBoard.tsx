import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import toast from "react-hot-toast";
import LoadingPage from "@/components/LoadingPage";

export default function DashBoard() {
  const navigate = useNavigate();
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("hongShengToken="))
    ?.split("=")[1];

  axios.defaults.headers.common["Authorization"] = token;

  if (!token) navigate("/login");

  const { mutate, isPending, data } = useMutation({
    mutationFn: () => api.auth.checkUser(),
    onError: (error) => {
      if (error) navigate("/login");
    },
    onSuccess: (data) => {
      if (!data.success) {
        navigate("/login");
      } else {
        toast.success("Welcome back!");
      }
    },
  });
  useEffect(() => {
    mutate();
  }, [mutate]);

  if (isPending) return <LoadingPage />;
  return (
    <main className="grid lg:grid-cols-6">
      <div className="hidden lg:block lg:col-span-1 lg:min-h-screen bg-muted">
        <div className="fixed bg-opacity-100">
          <Sidebar />
        </div>
      </div>
      <div className="lg:col-span-5">
        <Navbar uid={data?.uid ?? ""} />
        <div className="container py-8">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
