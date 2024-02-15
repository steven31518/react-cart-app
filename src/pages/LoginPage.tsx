import LoginForm from "@/components/LoginForm";
import CardWrap from "@/components/CardWrap";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 lg:px-0">
      <CardWrap title="Login" description="admin only" className="w-[400px]">
        <LoginForm />
      </CardWrap>
    </div>
  );
}
