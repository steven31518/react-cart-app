import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import {
  CustomFormField,
  CustomFormFieldTextArea,
  CustomFormFieldSwitch,
  CustomFormFieldNum,
} from "../FormComponents";
import { Button } from "../ui/button";
type Prop = {
  id: string;
};
export default function ProductForm({ id }: Prop) {
  //todo:remove console.log
  console.log(id);
  const formSchema = z.object({
    title: z
      .string()
      .min(1, {
        message: "title must be at least 1 characters.",
      })
      .max(20, {
        message: "title must be less than 10 characters.",
      }),
    category: z
      .string()
      .min(1, {
        message: "category must be at least 1 characters.",
      })
      .max(10, {
        message: "category must be less than 10 characters.",
      }),
    origin_price: z.number().min(1, {
      message: "origin_price must be at least 1 characters.",
    }),
    price: z.number().min(1, {
      message: "origin_price must be at least 1 characters.",
    }),
    unit: z
      .string()
      .min(1, {
        message: "unit must be at least 1 characters.",
      })
      .max(5, {
        message: "unit must be less than 5 characters.",
      }),
    description: z.string(),
    content: z.string(),
    is_enabled: z.number(),
    imageUrl: z.string(),
    imagesUrl: z.array(z.string()),
  });

  type InputType = z.infer<typeof formSchema>;

  const form = useForm<InputType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      origin_price: 0,
      price: 0,
      unit: "",
      description: "",
      content: "",
      is_enabled: 0,
      imageUrl: "",
      imagesUrl: [],
    },
    resetOptions: {
      keepDefaultValues: true,
    },
  });
  function onSubmit(data: InputType) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-flow-row grid-rows-10 gap-2"
      >
        <CustomFormField name="title" label="產品名稱" control={form.control} />

        <CustomFormField
          name="category"
          label="產品類別"
          control={form.control}
        />
        <CustomFormField name="unit" label="單位" control={form.control} />
        <CustomFormFieldNum
          name="origin_price"
          label="原價"
          control={form.control}
        />
        <CustomFormFieldNum name="price" label="售價" control={form.control} />
        <CustomFormFieldTextArea
          name="description"
          label="產品描述"
          control={form.control}
        />
        <CustomFormFieldTextArea
          name="content"
          label="產品內文"
          control={form.control}
        />
        <CustomFormFieldSwitch
          name="is_enabled"
          label="是否上架"
          control={form.control}
        />
        <div className="flex justify-center items-center">
          <Button className="w-48">確認送出</Button>
        </div>
      </form>
    </Form>
  );
}
