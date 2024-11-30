import { axiosInstance } from "@/lib/axios";
import { columns } from "./colums";
import { DataTable } from "./data-table";
import DecryptComponent from "./rsa";

const Page = async () => {
  const data: any = await axiosInstance.get("/nhanvien");
  return (
    <div className="">
      <DataTable columns={columns} data={data} />
     {/* <DecryptComponent/> */}
    </div>
  );
};

export default Page;

