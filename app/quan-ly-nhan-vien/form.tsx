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
import { hashSHA1 } from "@/lib/sha";
import { encryptWithRSA, publicKey_rsa_512 } from "@/lib/RSA_512";

export function FormInfoNhanVien({ dataModal, action }: any) {
  const FormSchema = z.object({
    MANV: z.string(),
    HOTEN: z.string(),
    LUONG: z.string(),
    EMAIL: z.string(),
    TENDN: z.string(),
    MATKHAU: z.string(),
    PUBKEY: z.string(),
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
    const mksha = hashSHA1(data.MATKHAU);
    const decryptLuong = encryptWithRSA(data.LUONG, publicKey_rsa_512);
    const s = {
      MANV: data.MANV,
      HOTEN: data.HOTEN,
      EMAIL: data.EMAIL,
      LUONG: decryptLuong,
      TENDN: data.TENDN,
      MATKHAU: mksha,
      PUBKEY: data.PUBKEY,
    };
    console.log(s);

    try {
      if (action === "create") {
        const res = await axiosInstance.post("/nhanvien", s);
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
