import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  CustomFormField,
  CustomFormFieldPassword,
} from "@/components/FormComponents";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export type SignIn = z.infer<typeof formSchema>;

export default function LoginForm() {
  const form = useForm<SignIn>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationFn: (data: SignIn) => api.auth.signIn(data),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      if (!data.success) {
        toast.error(data.message);
        return;
      } else {
        const { token, expired } = data;
        document.cookie = `hongShengToken=${token}; expires=${new Date(
          expired
        )};`;
        form.reset();
        navigate("/admin/products");
      }
    },
  });

  function onSubmit(data: SignIn) {
    mutate(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-flow-row grid-rows-3 gap-4">
          <CustomFormField
            label="帳號"
            name="username"
            control={form.control}
          />
          <CustomFormFieldPassword
            label="密碼"
            name="password"
            control={form.control}
          />
          <div className="flex justify-center items-center">
            <Button type="submit" className="w-48" disabled={isPending}>
              {isPending ? "Loading..." : "Login"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
