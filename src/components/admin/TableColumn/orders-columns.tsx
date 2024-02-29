import type { ColumnDef } from "@tanstack/react-table";
import { CheckCircle2 } from "lucide-react";
import { XCircle } from "lucide-react";
import { DialogWrap } from "@/components/DialogWrap";
import OrderForm from "@/components/front/OrderForm";
import { Button } from "@/components/ui/button";
import DeleteButton from "../DeleteButton";
import { OrderColums } from "@/api/adim/order";
import { ArrowUpDown } from "lucide-react";
import PriceCard from "@/components/PriceCard";

export const order_columns: ColumnDef<OrderColums>[] = [
  {
    accessorKey: "num",
    header: "序號",
  },
  {
    accessorKey: "create_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          訂單日期
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          {new Date(row.original.create_at * 1000).toLocaleDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: "訂購明細",
    cell: ({ row }) => {
      return (
        <div className="">
          <DialogWrap
            name={`${row.original.user.name}`}
            className="max-w-4xl"
            title={`編號:${row.original.id}`}
          >
            <div className="grid lg:grid-cols-2 gap-2">
              <OrderForm
                userData={{
                  user: { ...row.original.user },
                  message: row.original.message,
                }}
              />
              <div className="flex flex-col gap-2">
                {Object.values(row.original.products).map((product) => {
                  return (
                    <div className="p-4 border rounded" key={product.id}>
                      <PriceCard data={product} />
                    </div>
                  );
                })}
              </div>
            </div>
          </DialogWrap>
        </div>
      );
    },
  },

  {
    accessorKey: "is_paid",
    header: "是否付款",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          {row.original.is_paid ? (
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          ) : (
            <XCircle className="h-6 w-6 text-red-500" />
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "id",
    header: "操作",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      return (
        <div className="flex justify-center items-center gap-4">
          <DeleteButton id={id} deleteItem={2} label={id} />
        </div>
      );
    },
  },
];
