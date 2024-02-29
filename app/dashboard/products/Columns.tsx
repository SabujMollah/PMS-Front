"use client";
import { product } from "@/types/type";
import { ColumnDef } from "@tanstack/react-table";

import { toast } from "react-toastify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import axios from 'axios';
import { useRouter } from "next/navigation";
import Link from "next/link";

export const Columns: ColumnDef<product>[] = [
  {
    accessorKey: "productId",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },

  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "description",
    header: "Description",
  },

  {
    id: "actionId",
    header: "Product Status",
    cell: ({ row }: any) => {
      const status = row.original;
      return <div>{status.status ? "Active" : "In active"}</div>;
    },
  },

  {
    id: "actions",
    cell: ActionsCell,
  },
];

function ActionsCell({ row }: any) {
  // const { data: session } = useSession();
  const router = useRouter();
  const removeEmployee = async (id: string) => {
    const { data } = await axios.delete(`https://localhost:5001/api/products/${id}`, {
      // headers: { Authorization: `Bearer ${session?.user.accessToken}` },
    });
    toast.success(data.message);
    router.refresh();
  };

  const product = row.original;
  console.log("console data ", `/products/${product.productId}`);
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" id="moreHorizontal">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="cursor-pointer">
            <Link href={`/dashboard/products/${product.productId}`} id="edit"> Edit
              </Link>
          </DropdownMenuItem>

          <DialogTrigger asChild>
            <DropdownMenuItem className="cursor-pointer">
              <span id="delete">Delete</span>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action of remove
            <span className="text-red-500"> {product.name} </span>cannot be
            undone. Are you sure you want to permanently delete this file from
            our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="bg-green-700 hover:bg-slate-500" id="cancel">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              onClick={() => {
                removeEmployee(product.productId);
              }}
              className="bg-red-700 hover:bg-slate-500"
              id="confirm"
            >
              Confirm
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}