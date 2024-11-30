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

export function FormInfoLogin({ dataModal, action }: any) {
  const FormSchema = z.object({
    TENDN: z.string(),
    MATKHAU: z.string(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      TENDN: dataModal?.TENDN ?? "",
      MATKHAU: dataModal?.MATKHAU ?? "",
    },
  });
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const mksha = hashSHA1(data.MATKHAU);    
    const s = {
      TENDN: data.TENDN,
      MATKHAU: mksha,
    };
    try {
      const res = await axiosInstance.post("/auth/login", data);      
      localStorage.setItem("user", JSON.stringify(res.data)); // Chuyển dữ liệu thành chuỗi JSON
      window.location.href = "/quan-ly-lop-hoc";
    } catch (error: any) {
      console.log("error", error);
    }
  };

  return (
    <div className="w-full mr-28 py-12 px-16 space-y-8 bg-white shadow-2xl">
      {/* Header */}
      <p className="text-center text-5xl font-bold text-neutral-800">
        Đăng nhập
      </p>

      {/* Login Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white mt-5 space-y-6"
        >
          <div className="flex flex-col gap-8">
            <FormField
              control={form.control}
              name="TENDN"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">
                    Tên đăng nhập
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full !rounded-[4px]"
                      placeholder="Tên đăng nhập"
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
              name="MATKHAU"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl font-bold">Mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full !rounded-[4px]"
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
              className="text-white !bg-neutral-800 hover:bg-neutral-600 duration-300 w-full !rounded-none text-xl !h-12"
            >
              Đăng nhập
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
