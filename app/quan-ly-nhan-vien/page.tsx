import { axiosInstance } from "@/lib/axios";
import { columns } from "./colums";
import { DataTable } from "./data-table";
import DecryptComponent from "./rsa";
import { decryptSalary, encryptSalary } from "@/lib/rsa512";

const Page = async () => {
  const data: any = await axiosInstance.get("/nhanvien");
  const en = encryptSalary("20000", "PUBPUB");

  return (
    <div className="">
      <DataTable columns={columns} data={data} />

      {/* {decryptSalary(en, privateKey)} */}
      {/* <DecryptComponent/> */}
    </div>
  );
};

export default Page;
