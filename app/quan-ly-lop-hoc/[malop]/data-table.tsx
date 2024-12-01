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
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import { decodeBufferAndHash } from "@/lib/decode-sha1";
import { FormInfoLopHoc } from "./form";
import { Payment } from "./columns";
import { useParams } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  malop: any;
}

export function DataTable<TData, TValue>({
  data,
  malop,
}: DataTableProps<TData, TValue>) {
  const [openModal, setOpenModal] = useState(false);
  const [action, setAction] = useState("");
  const [dataModal, setDataModal] = useState({});

  const [classData, setClassData] = useState(null);

  useEffect(() => {
    // Gọi API để lấy thông tin lớp theo malop
    const fetchClassData = async () => {
      try {
        const response: any = await axiosInstance.get(`/lop/${malop}`);
        setClassData(response.MANV);
      } catch (error) {
        console.error("Error fetching class data:", error);
      }
    };

    fetchClassData();
  }, [malop]);

  const userJson: any = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  const isNV = classData === user.MANV;
  console.log(isNV);
  

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "STT",
      header: "STT",
      cell: ({ row }) => row.index + 1,
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
      accessorKey: "TENDN",
      header: "TENDN",
    },
    {
      accessorKey: "MALOP",
      header: "MALOP",
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
      accessorKey: "ACTION",
      header: "ACTION",
      cell: ({ row }) => {
        const handleUpdate = () => {
          setAction("update");
          setOpenModal(true);
          setDataModal(row.original);
          //   window.location.reload();
        };

        const handleDelete = async () => {
          const res = await axiosInstance.delete(
            `/sinhvien/${row.original.MASV}`
          );
          window.location.reload();
        };

        const seeScore = async () => {
          window.location.href =
            "/quan-ly-lop-hoc/" + malop + "/" + row.original.MASV;
        };

        return (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={isNV ? false : true}
              onClick={handleUpdate}
            >
              Update
            </Button>
            <Button
              variant="destructive"
              size="sm"
              disabled={isNV ? false : true}
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button variant="destructive" size="sm" onClick={seeScore}>
              Xem Bảng điểm
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

  console.log("user ql chi tiet lop", user);
  return (
    <div className="">
      <div className="flex py-6">
        <Button
          onClick={() => {
            setAction("create"), setOpenModal(true);
          }}
          disabled={isNV ? false : true}
          className="text-white w-[200px] ml-auto text-xl"
        >
          Tạo sinh viên
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

      <Modal isOpen={openModal} setOpen={handleForm} className="relative">
        <div className="w-fit bg-white mx-auto rounded-[12px] !p-0 !overflow-hidden">
          <div className="relative flex flex-col sm:max-h-[600px] max-h-[400px] overflow-y-scroll no-scrollbar">
            <CancelCircle
              className="absolute bg-white rounded-full top-2.5 right-2.5 w-6 h-6 stroke-black ml-auto cursor-pointer"
              onClick={handleForm}
            />
            <div className="p-6">
              <FormInfoLopHoc
                data={data}
                action={action}
                dataModal={dataModal}
                malop={malop}
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
