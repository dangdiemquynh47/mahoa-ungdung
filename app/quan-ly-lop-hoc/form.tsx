"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";

export function FormInfoClass({ dataModal, action, user }: any) {
  const FormSchema = z.object({
    MALOP: z.string().min(2, {
      message: "Mã lớp phải có ít nhất 2 ký tự.",
    }),
    TENLOP: z.string().min(2, {
      message: "Tên lớp phải có ít nhất 2 ký tự.",
    }),
    MANV: z.string().min(2, {
      message: "Mã nhân viên phải có ít nhất 2 ký tự.",
    }),
  });
const manv = user.MANV
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      MALOP: dataModal?.MALOP ?? "",
      TENLOP: dataModal?.TENLOP ?? "",
      MANV: manv ?? "",
    },
  });
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const s = {
      MALOP: data.MALOP,
      TENLOP: data.TENLOP,
      MANV: data.MANV,
    };
    try {
      if (action === "create") {
        const res = await axiosInstance.post("/lop", data);
        console.log(res);
        
      } else if (action === "update") {
        const res = await axiosInstance.patch(`/lop/${data.MALOP}`, data);
        console.log("udpate", res);
      }
      window.location.reload();
    } catch (error: any) {
      console.log("error", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-6">
        <div className="flex gap-8">
          <div className="w-[1/2] flex flex-col gap-4">
            <FormField
              control={form.control}
              name="MALOP"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã Lớp</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[400px]"
                      placeholder="Mã Lớp"
                      {...field}
                      disabled={action === "update"} // Disable for update
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="TENLOP"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên lớp</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[400px]"
                      placeholder="Tên lớp "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="MANV"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>MANV</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[400px]"
                      placeholder="MANV "
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              //   onClick={form.handleSubmit(onSubmit)}
              className="text-white w-[200px] ml-auto text-xl"
            >
              {action === "create" ? "Tạo lớp" : "Cập nhật lớp"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
