import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import { api } from "@/api";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function DashBoard() {
  const navigate = useNavigate();
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("hongShengToken="))
    ?.split("=")[1];

  axios.defaults.headers.common["Authorization"] = token;
  console.log("token", token)

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

  if (isPending) return <div>validating...</div>;
  return (
    <main className="grid lg:grid-cols-6">
      <div className="hidden lg:block lg:col-span-1 lg:min-h-screen bg-muted">
        <div className="fixed bg-opacity-100">
          <Sidebar />
        </div>
      </div>
      <div className="lg:col-span-5">
        <Navbar uid={data?.uid ?? ""} />
        <div className="py-8 px-4 sm:px-8 lg:px-16 ">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
