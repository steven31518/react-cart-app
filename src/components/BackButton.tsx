import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowLeftCircle } from "lucide-react";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      variant={"link"}
      className="rounded-full self-start w-20 mb-6 text-blue-500"
      size="icon"
      onClick={() => navigate(-1)}
    >
      <ArrowLeftCircle/>
      回到前頁
    </Button>
  );
}
