import { axiosInstance } from "@/lib/axios";
import { columns } from "./colums";
import { DataTable } from "./data-table";

const Page = async () => {
  const data: any[] = await axiosInstance.get("/nhanvien");
  // const plainText = "123";
  // const encryptedText = encryptWithRSA(plainText, publicKey_rsa_512);

  // const decryptedText = decryptWithRSA(encryptedText, privateKey_rsa_512);

  return (
    <div className="">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Page;
