import LinksDropdown from "./LinksDropdown";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

type Props = {
  uid: string;
};
export default function Navbar({ uid }: Props) {
  const navigate = useNavigate();
  const { isPending, mutate } = useMutation({
    mutationFn: () => api.auth.signOut(),
    onError: (error) => {
      if (error) toast.error(error.message);
    },
    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      navigate("/login");
    },
  });
  return (
    <nav className="bg-muted py-4 sm:px-16 lg:px-24 px-4 flex items-center justify-between">
      <div>
        <LinksDropdown />
      </div>
      <div className="flex items-center gap-x-4">
        {uid && (
          <Button
            disabled={isPending}
            variant={"outline"}
            onClick={() => mutate()}
          >
            <LogOut />
            <span className="capitalize ms-2">
              {isPending ? "Signing out..." : "Sign out"}
            </span>
          </Button>
        )}
      </div>
    </nav>
  );
}
