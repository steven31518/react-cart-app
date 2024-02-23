import { z } from "zod";
import { EmailSchema, sendEmail } from "@/lib/email";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { CustomFormField, CustomFormFieldTextArea } from "../FormComponents";
import { Button } from "../ui/button";
import { SendHorizontal } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { SiAnswer } from "react-icons/si";
export default function ContactForm() {
  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      message: "",
      from_name: "",
      from_mail: "",
      to_name: "steven",
      to_mail: "james31518@gamil.com",
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: (data: z.infer<typeof EmailSchema>) => sendEmail(data),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
    },
    onSettled: () => {
      form.reset();
    },
  });
  function onSubmit(data: z.infer<typeof EmailSchema>) {
    mutate(data);
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-muted p-8 rounded-md place-self-start w-full max-w-2xl"
        >
          <h1 className="text-4xl font-semibold mb-6">聯絡我</h1>
          <div className="w-full flex flex-col gap-4">
            <CustomFormField
              label="姓名"
              name="from_name"
              control={form.control}
            />

            <CustomFormField
              label="信箱"
              name="from_mail"
              control={form.control}
            />

            <CustomFormFieldTextArea
              label="留言"
              name="message"
              control={form.control}
            />

            <div className="flex justify-center lg:col-span-2 lg:self-end mt-6">
              <Button
                type="submit"
                size="icon"
                className="capitalize w-48 font-semibold"
                disabled={isPending}
              >
                <SendHorizontal />
                {isPending ? "送出中" : "送出訊息"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <div className="w-full flex items-center justify-center rounded-full bg-blue-600 p-20">
        <SiAnswer className="w-[300px] h-[200px]" />
      </div>
    </div>
  );
}
