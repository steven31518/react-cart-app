import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { XCircle } from "lucide-react";

export interface Product {
  category: string;
  content: string;
  description: string;
  id: string;
  is_enabled: number;
  origin_price: number;
  price: number;
  title: string;
  unit: string;
  imageUrl: string;
  imagesUrl: string[];
}

export const products_columns: ColumnDef<Product>[] = [
  {
    accessorKey: "category",
    header: "類別",
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          名稱
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "imageUrl",
    header: "產品主圖",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center items-center">
          <img
            src={row.getValue("imageUrl")}
            className="w-[120px] aspect-square rounded-lg"
            alt="未上傳"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          定價
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "origin_price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          原價
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("origin_price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "is_enabled",
    header: "上架狀態",
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

  //   {
  //     accessorKey: "id",
  //     header: () => {
  //       return <ProductEditor />;
  //     },
  //     cell: ({ row }) => {
  //       return <ProductEditor id={row.getValue("id")} />;
  //     },
  //   },
];
