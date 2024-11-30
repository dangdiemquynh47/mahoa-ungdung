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


