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
import { useImageDropzoneStore } from "@/lib/zustand";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import { UploadProduct } from "@/api/adim/products";
import toast from "react-hot-toast";
import { useEffect } from "react";

type Prop = {
  id: "create" | string;
};
export default function ProductForm({ id }: Prop) {
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
      message: "金額不得為負且須大於0.",
    }),
    price: z.number().min(1, {
      message: "金額不得為負且須大於0.",
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
  const { imageUrls, mainImageUrl, removeAllImage, addImage, pickMainImage } =
    useImageDropzoneStore();

  const queryClient = useQueryClient();

  const { data: product } = useQuery({
    queryKey: ["getAllProducts", { type: "admin" }],
    queryFn: () => api.admin.getAdminProducts(),
    select: (data) =>
      Object.values(data.products).find((product) => product.id === id),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: product?.title || "",
      category: product?.category || "",
      origin_price: product?.origin_price || 0,
      price: product?.price || 0,
      unit: product?.unit || "",
      description: product?.description || "",
      content: product?.content || "",
      is_enabled: product?.is_enabled || 0,
      imageUrl: mainImageUrl,
      imagesUrl: imageUrls,
    },
    resetOptions: {
      keepDefaultValues: true,
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: ({ data, id }: UploadProduct) => {
      if (id === "create") return api.admin.addProduct({ data: data });
      return api.admin.updateProduct({ data: data, id: id });
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllProducts", { type: "admin" }],
      });
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      ...values,
      imageUrl: mainImageUrl,
      imagesUrl: imageUrls,
    };
    mutate({ data: data, id: id });
  }
  useEffect(() => {
    if (id) removeAllImage();
    addImage(product?.imagesUrl || []);
    pickMainImage(product?.imageUrl || "");
  }, [
    addImage,
    id,
    pickMainImage,
    product?.imageUrl,
    product?.imagesUrl,
    removeAllImage,
  ]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-flow-row grid-rows-10 gap-2 px-4"
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
          <Button className="w-48" type="submit" disabled={isPending}>
            {isPending ? "上傳中..." : "確認送出"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
