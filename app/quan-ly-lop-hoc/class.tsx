"use client";

import Modal from "@/components/ui/dialog";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormInfoClass } from "./form";
import { Settings } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { axiosInstance } from "@/lib/axios";

export const Class = ({ data }: any) => {
  const [openModal, setOpenModal] = useState(false);
  const [action, setAction] = useState("");
  const [dataModal, setDataModal] = useState({});
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);

  const handleForm = () => {
    setDataModal({});
    setOpenModal(!openModal);
  };

  const handleUpdate = (data: any) => {
    setAction("update");
    setOpenModal(true);
    setDataModal(data);
    //   window.location.reload();
  };
  const handleDelete = async (malop: any) => {
    const res = await axiosInstance.delete(`/lop/${malop}`);
    window.location.reload();
  };
  const userJson: any = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;
  console.log("user ql lop", user);

  return (
    <div className="">
      <Button
        className=""
        onClick={() => {
          setOpenModal(true), setAction("create");
        }}
      >
        Thêm lớp học
      </Button>
      <div className="grid grid-cols-4 gap-6 py-10">
        {data?.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className="flex gap-2 p-3 h-full w-full border-[1px] border-solid border-primary rounded-md"
            >
              <div>
                <p>Mã lớp: {item.MALOP}</p>
                <p>Tên lớp: {item.TENLOP}</p>
                <p>Mã nhân viên: {item.MANV}</p>
              </div>

              <TooltipProvider>
                <Tooltip
                  open={openTooltip === item.MALOP}
                  onOpenChange={(open: any) => {
                    setOpenTooltip(open ? item.MALOP : null); // Mở tooltip cho item.MALOP, đóng tooltip khi không mở
                  }}
                >
                  <TooltipTrigger asChild>
                    <Settings
                      className="ml-auto w-6 h-6"
                      onClick={() =>
                        setOpenTooltip((prev) =>
                          prev === item.MALOP ? null : item.MALOP
                        )
                      }
                    />
                  </TooltipTrigger>
                  <TooltipContent className="bg-white flex flex-col gap-2">
                    <Button
                      onClick={() => {
                        window.location.href = "/quan-ly-lop-hoc/" + item.MALOP;
                      }}
                    >
                      Xem chi tiết
                    </Button>
                    <Button
                      onClick={() => handleUpdate(item)}
                      disabled={item.MANV !== user.MANV}
                    >
                      Cập nhật
                    </Button>
                    <Button
                      onClick={() => handleDelete(item.MALOP)}
                      disabled={item.MANV !== user.MANV}
                    >
                      Xoá
                    </Button>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          );
        })}
      </div>
      <Modal isOpen={openModal} setOpen={handleForm} className="relative">
        <div className="w-fit bg-white mx-auto rounded-[12px] !p-0 !overflow-hidden">
          <div className="relative flex flex-col sm:max-h-[600px] max-h-[400px] overflow-y-scroll no-scrollbar">
            <CancelCircle
              className="absolute bg-white rounded-full top-2.5 right-2.5 w-6 h-6 stroke-black ml-auto cursor-pointer"
              onClick={handleForm}
            />
            <div className="p-6">
              <FormInfoClass
                data={data}
                action={action}
                dataModal={dataModal}
                user={user}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

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
