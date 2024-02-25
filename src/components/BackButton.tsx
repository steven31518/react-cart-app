import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowLeftCircle } from "lucide-react";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      variant={"ghost"}
      className="rounded-full self-start"
      size="icon"
      onClick={() => navigate(-1)}
    >
      <ArrowLeftCircle />
    </Button>
  );
}
