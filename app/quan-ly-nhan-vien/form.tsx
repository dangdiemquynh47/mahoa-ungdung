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

export function FormInfoNhanVien({ dataModal, action }: any) {
  const FormSchema = z.object({
    MANV: z.string().min(2, {
      message: "Mã nhân viên phải có ít nhất 2 ký tự.",
    }),
    HOTEN: z.string().min(2, {
      message: "Họ và tên phải có ít nhất 2 ký tự.",
    }),
    LUONG: z.string(),
    EMAIL: z.string().email({ message: "Email không hợp lệ." }),
    TENDN: z.string(),
    MATKHAU: z.string().min(2, {
      message: "Mật khẩu phải có ít nhất 2 ký tự.",
    }),
    PUBKEY: z.string().min(2, {
      message: "Pubkey phải có ít nhất 2 ký tự.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      MANV: dataModal?.MANV ?? "",
      HOTEN: dataModal?.HOTEN ?? "",
      EMAIL: dataModal?.EMAIL ?? "",
      LUONG: dataModal?.LUONG ?? "",
      TENDN: dataModal?.TENDN ?? "",
      MATKHAU: dataModal?.MATKHAU ?? "",
      PUBKEY: dataModal?.PUBKEY ?? "",
    },
  });
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const s = {
      MANV: data.MANV,
      HOTEN: data.HOTEN,
      EMAIL: data.EMAIL,
      LUONG: data.LUONG,
      TENDN: data.TENDN,
      MATKHAU: data.MATKHAU,
      PUBKEY: data.PUBKEY,
    };
    try {
      if (action === "create") {
        const res = await axiosInstance.post("/nhanvien", data);
      } else if (action === "update") {
        const res = await axiosInstance.patch(`/nhanvien/${data.MANV}`, data);
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
              name="MANV"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã nhân viên</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[400px]"
                      placeholder="Mã nhân viên"
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
              name="HOTEN"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[400px]"
                      placeholder="Họ và tên "
                      {...field}
                      
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="EMAIL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[400px]"
                      placeholder="Email "
                      {...field}
                      
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="LUONG"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lương</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[400px]"
                      placeholder="Lương "
                      {...field}
                      
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-[1/2] flex flex-col gap-4">
            <FormField
              control={form.control}
              name="TENDN"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên đăng nhập</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[400px]"
                      placeholder="Tên đăng nhập "
                      {...field}
                      
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="MATKHAU"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[400px]"
                      placeholder="Mật khẩu "
                      {...field}
                      
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="PUBKEY"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pubkey</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[400px]"
                      placeholder="Pubkey "
                      {...field}
                      
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
              {action === "create" ? "Tạo nhân viên" : "Cập nhật nhân viên"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
