"use client";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  STT: number;
  MASV: string;
  MAHP: string;
  DIEMTHI: string;
  ACTION: "update" | "delete";
};
