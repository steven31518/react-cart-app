import OrderDetail from "@/components/front/OrderDetail";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
export default function PaymentPage() {
  const { id } = useParams();

  if (!id)
    return (
      <div>
        <p>無法取得付款資訊</p>
        <Link to="/order/check" className="text-blue-500">
          回到訂單
        </Link>
      </div>
    );
  return (
    <div>
      <OrderDetail searchParams={id} />
    </div>
  );
}
