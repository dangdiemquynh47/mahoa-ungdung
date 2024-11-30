"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Modal from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { FormInfoNhanVien } from "./form";
import { Button } from "@/components/ui/button";
import { Payment } from "./colums";
import { axiosInstance } from "@/lib/axios";
import { decodeBufferAndHash } from "@/lib/decode-sha1";
import { encryptWithRSA512 } from "@/lib/rsa-512";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  data,
}: DataTableProps<TData, TValue>) {
  const [openModal, setOpenModal] = useState(false);
  const [action, setAction] = useState("");
  const [dataModal, setDataModal] = useState({});
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "STT",
      header: "STT",
      
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
//       cell: (info) => {
//         const puclickey = `-----BEGIN PUBLIC KEY-----
// ${info.row.original.PUBKEY}
// -----END PUBLIC KEY-----`;
//         return (
//           <div className="flex gap-2">
//             {encryptWithRSA512(info.getValue(), puclickey)}
//           </div>
//         );
//       },
    },
    {
      accessorKey: "TENDN",
      header: "TENDN",
    },
    {
      accessorKey: "MATKHAU",
      header: "MATKHAU",
      cell: (info) => {
        return (
          <div className="flex gap-2">
            {decodeBufferAndHash(info.getValue())}
          </div>
        );
      },
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
          setAction("update");
          setOpenModal(true);
          setDataModal(row.original);
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
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleForm = () => {
    setDataModal({});
    setOpenModal(!openModal);
  };
  console.log(dataModal);

  return (
    <div className="">
      <div className="flex py-6">
        <Button
          onClick={() => {
            setAction("create"), setOpenModal(true);
          }}
          className="text-white w-[200px] ml-auto text-xl"
        >
          Tạo nhân viên
        </Button>
      </div>

      <div className="rounded-md border w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: any, index) => (
                <TableRow
                  className="cursor-pointer"
                  onClick={() => {
                    // setAction("update");
                    // setOpenModal(true);
                    // setDataModal(row.original);
                  }}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell: any) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* update */}

      <Modal isOpen={openModal} setOpen={handleForm} className="relative">
        <div className="w-fit bg-white mx-auto rounded-[12px] !p-0 !overflow-hidden">
          <div className="relative flex flex-col sm:max-h-[600px] max-h-[400px] overflow-y-scroll no-scrollbar">
            <CancelCircle
              className="absolute bg-white rounded-full top-2.5 right-2.5 w-6 h-6 stroke-black ml-auto cursor-pointer"
              onClick={handleForm}
            />
            <div className="p-6">
              <FormInfoNhanVien
                data={data}
                action={action}
                dataModal={dataModal}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export function CancelCircle(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      {...props}
    >
      <path
        d="M14 14L8 8m0 6l6-6"
        strokeOpacity={0.6}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 11c0-5.523-4.477-10-10-10S1 5.477 1 11s4.477 10 10 10 10-4.477 10-10z"
        strokeOpacity={0.6}
        strokeWidth={1.5}
      />
    </svg>
  );
}
