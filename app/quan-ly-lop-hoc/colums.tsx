"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  STT: number;
  MASV: string;
  HOTEN: string;
  NGAYSINH: string;
  DIACHI: string;
  MALOP: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "STT",
    header: "STT",
  },
  {
    accessorKey: "MASV",
    header: "MASV",
  },
  {
    accessorKey: "HOTEN",
    header: "HOTEN",
  },
  {
    accessorKey: "NGAYSINH",
    header: "NGAYSINH",
  },
  {
    accessorKey: "DIACHI",
    header: "DIACHI",
  },
  {
    accessorKey: "MALOP",
    header: "MALOP",
  },
];
