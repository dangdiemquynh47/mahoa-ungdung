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
import {
  decryptWithRSA,
  encryptWithRSA,
  privateKey_rsa_512,
  publicKey_rsa_512,
} from "@/lib/RSA_512";

export function FormInfoDiem({ dataModal, action, masv }: any) {
  const FormSchema = z.object({
    MASV: z.string(),
    MAHP: z.string(),
    DIEMTHI: z.string(),
  });
  // const DIEMTHIBuffer: any = dataModal?.DIEMTHI;
  // const DIEMTHI = Buffer.from(DIEMTHIBuffer).toString("utf-8");
  // const de = decryptWithRSA(DIEMTHI, privateKey_rsa_512);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      MASV: masv,
      MAHP: dataModal?.MAHP ?? "",
      DIEMTHI: dataModal?.DIEMTHI ?? "",
    },
  });
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const decryptDiemthi = encryptWithRSA(data.DIEMTHI, publicKey_rsa_512);
    const s = {
      MASV: data.MASV,
      MAHP: data.MAHP,
      DIEMTHI: decryptDiemthi,
    };

    try {
      if (action === "create") {
        const res = await axiosInstance.post("/bangdiem", s);
        window.location.reload();
      } else if (action === "update") {
        const res = await axiosInstance.patch(`/bangdiem/${data.MASV}`, s);
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
                      disabled={true} // Disable for update
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="MAHP"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mã học phần</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[400px]"
                      placeholder="Mã học phần "
                      {...field}
                      disabled={action === "update"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-[1/2] grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="DIEMTHI"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Điểm thi</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[400px]"
                      placeholder="Điểm thi "
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
              className="mt-6 text-white  w-[200px] ml-auto text-xl"
            >
              {action === "create" ? "Tạo Bảng điểm" : "Cập nhật Bảng điểm"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
