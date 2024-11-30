import { axiosInstance } from "@/lib/axios";
import { columns } from "./colums";
import { DataTable } from "./data-table";
import DecryptComponent from "./rsa";
import { encryptWithRSA512 } from "@/lib/rsa-512";
import { decryptWithRSA, encryptWithRSA, generateRSAKeys, privateKey_rsa_512, publicKey_rsa_512 } from "@/lib/RSA_512";

const Page = async () => {
  const data: any[] = await axiosInstance.get("/nhanvien");

  return (
    <div className="">
      <DataTable columns={columns} data={data} />
     {/* <DecryptComponent/> */}
    </div>
  );
};

export default Page;



