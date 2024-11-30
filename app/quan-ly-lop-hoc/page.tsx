import { axiosInstance } from "@/lib/axios";
import { Class } from "./class";

export default async function Page() {
  const data: any = await axiosInstance.get("/lop");
  return (
    <>
      <Class data={data} />
    </>
  );
}
