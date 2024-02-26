import OrderDetail from "@/components/front/OrderDetail";
import { useNavigate, useParams } from "react-router-dom";
export default function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  if (!id) return navigate("/order/check");
  return (
    <div>
      <OrderDetail searchParams={id} />
    </div>
  );
}
