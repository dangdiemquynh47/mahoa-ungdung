"use client";

import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  STT: number;
  MANV: string;
  HOTEN: string;
  EMAIL: string;
  LUONG: string;
  TENDN: string;
  MATKHAU: string;
  PUBKEY: string;
  ACTION: "update" | "delete";
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "STT",
    header: "STT",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "MANV",
    header: "MANV",
  },
  {
    accessorKey: "HOTEN",
    header: "HOTEN",
  },
  {
    accessorKey: "EMAIL",
    header: "EMAIL",
  },
  {
    accessorKey: "LUONG",
    header: "LUONG",
  },
  {
    accessorKey: "TENDN",
    header: "TENDN",
  },
  {
    accessorKey: "MATKHAU",
    header: "MATKHAU",
  },
  {
    accessorKey: "PUBKEY",
    header: "PUBKEY",
  },
  {
    accessorKey: "ACTION",
    header: "ACTION",
    cell: ({ row }) => {
      const handleUpdate = () => {
        const payment = row.original;
        console.log("Update", payment);
        // Your update logic here
      };

      const handleDelete = async () => {
        const res = await axiosInstance.delete(
          `/nhanvien/${row.original.MANV}`
        );
        window.location.reload();
      };

      return (
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      );
    },
  },
];
