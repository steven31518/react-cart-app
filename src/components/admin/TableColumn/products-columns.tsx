import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeleteButton from "../DeleteButton";
import { CheckCircle2 } from "lucide-react";
import { XCircle } from "lucide-react";
import type { Product } from "@/api/adim/products";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";

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
  {
    accessorKey: "id",
    header: () => {
      return (
        <div className="flex items-center justify-center">
          <Link to="/admin/edit_product/create">
            <Button>
              <PlusCircle />
              <span className="ms-2">新增產品</span>
            </Button>
          </Link>
        </div>
      );
    },
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      const label = row.getValue("title") as string;
      return (
        <div className="flex items-center justify-center gap-2">
          <Link to={`/admin/edit_product/${id}`}>
            <Button variant={"outline"}>編輯</Button>
          </Link>
          <DeleteButton id={id} deleteItem="產品" label={label}></DeleteButton>
        </div>
      );
    },
  },
];
