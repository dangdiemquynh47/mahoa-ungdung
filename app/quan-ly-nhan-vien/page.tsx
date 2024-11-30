import { axiosInstance } from "@/lib/axios";
import { columns } from "./colums";
import { DataTable } from "./data-table";
import {
  decryptWithRSA,
  encryptWithRSA,
  generateRSAKeys,
  privateKey_rsa_512,
  publicKey_rsa_512,
} from "@/lib/RSA_512";

const Page = async () => {
  const data: any[] = await axiosInstance.get("/nhanvien");
  const plainText = "123";
  const encryptedText = encryptWithRSA(plainText, publicKey_rsa_512);
  console.log("Dữ liệu mã hóa:", encryptedText);

  const decryptedText = decryptWithRSA(encryptedText, privateKey_rsa_512);
  console.log("Dữ liệu giải mã:", decryptedText);

  return (
    <div className="">
      <DataTable columns={columns} data={data} />
      {/* {decryptSalary(en, privateKey)} */}
      {/* <DecryptComponent/> */}
    </div>
  );
};

export default Page;
