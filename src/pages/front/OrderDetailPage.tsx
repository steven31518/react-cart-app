import { useParams } from "react-router-dom";

export default function OrderDetailPage() {
  const { id } = useParams();
  return <div>{`orderId:${id}`}</div>;
}
