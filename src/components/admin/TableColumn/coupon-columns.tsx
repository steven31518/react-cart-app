import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { XCircle } from "lucide-react";
import { DialogWrap } from "@/components/DialogWrap";
import CouponForm from "../CouponForm";
export interface CouponType {
  title: string;
  percent: number;
  code: string;
  due_date: Date;
  is_enabled: number;
  id: string;
  num: number;
}

export const coupon_columns: ColumnDef<CouponType>[] = [
  {
    accessorKey: "num",
    header: "序號",
  },
  {
    accessorKey: "title",
    header: "優惠內容",
  },
  {
    accessorKey: "code",
    header: "代碼",
  },
  {
    accessorKey: "percent",
    header: "折扣",
  },
  {
    accessorKey: "due_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          到期日
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          {row.original.due_date.toLocaleDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "is_enabled",
    header: "是否啟用",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center">
          {row.getValue("is_enabled") === 1 ? (
            <CheckCircle2 className="text-green-500" />
          ) : (
            <XCircle className="text-destructive" />
          )}
        </div>
      );
    },
  },
  {
    header: "test",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center gap-4">
          <DialogWrap name="編輯" title={`${row.original.id}`}>
            <CouponForm coupon={row.original} />
          </DialogWrap>
          <Button variant={"link"}>刪除</Button>
        </div>
      );
    },
  },

  //   {
  //     accessorKey: "id",
  //     header: () => {
  //       return <CouponEditor />;
  //     },
  //     cell: ({ row }) => {
  //       return <CouponEditor id={row.getValue("id")} />;
  //     },
  //   },

  //   {
  //     accessorKey: "id",
  //     header: "編輯",
  //     cell: ({ row }) => {
  //       return (
  //         <div className="flex justify-center">
  //           <ProductEditor product={row.original} />
  //         </div>
  //       );
  //     },
  //   },
];
