import LoginForm from "@/components/LoginForm";
import CardWrap from "@/components/CardWrap";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 lg:px-0">
      <CardWrap
        title="購物車管理平台"
        description="請輸入管理員帳號密碼"
        className="w-[400px]"
      >
        <LoginForm />
        <Link to="/" className="flex justify-center items-center">
          <Button variant={"link"}>返回賣場</Button>
        </Link>
      </CardWrap>
    </div>
  );
}
