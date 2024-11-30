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

export function FormInfoLopHoc({ dataModal, action }: any) {
  const FormSchema = z.object({
    MASV: z.string(),
    HOTEN: z.string(),
    NGAYSINH: z.string(),
    DIACHI: z.string(),
    MALOP: z.string(),
    TENDN: z.string(),
    MATKHAU: z.string(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      MASV: dataModal?.MASV ?? "",
      HOTEN: dataModal?.HOTEN ?? "",
      DIACHI: dataModal?.DIACHI ?? "",
      NGAYSINH: dataModal?.NGAYSINH ?? "",
      MALOP: dataModal?.MALOP ?? "",
      TENDN: dataModal?.TENDN ?? "",
      MATKHAU: dataModal?.MATKHAU ?? "",
    },
  });
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const s = {
      MASV: data.MASV,
      HOTEN: data.HOTEN,
      NGAYSINH: data.NGAYSINH,
      DIACHI: data.DIACHI,
      MALOP: data.MALOP,
      TENDN: data.TENDN,
      MATKHAU: data.MATKHAU,
    };

    console.log(s);
    
    try {
      if (action === "create") {
        const res = await axiosInstance.post("/sinhvien", data);
        window.location.reload();
      } else if (action === "update") {
        const res = await axiosInstance.patch(`/sinhvien/${data.MASV}`, data);
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
              name="MASV"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã sinh viên</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[400px]"
                      placeholder="Mã sinh viên"
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
              name="DIACHI"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Địa chỉ</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[400px]"
                      placeholder="Địa chỉ "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="NGAYSINH"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ngày sinh</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[400px]"
                      placeholder="Ngày sinh "
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
              name="MALOP"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã lớp</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[400px]"
                      placeholder="Mã lớp "
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

            <Button
              type="submit"
              //   onClick={form.handleSubmit(onSubmit)}
              className="text-white w-[200px] ml-auto text-xl"
            >
              {action === "create" ? "Tạo sinh viên" : "Cập nhật sinh viên"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
