import { axiosInstance } from "@/lib/axios";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const Page = async ({ params }: any) => {
  const { malop } = params;

  const lop: any = await axiosInstance.get("/lop");
  const sinhvien: any = await axiosInstance.get("/sinhvien");

  // Nhóm sinh viên theo lớp
  const result = lop.reduce((acc: any, classInfo: any) => {
    acc[classInfo.MALOP] = sinhvien
      .filter((student: any) => student.MALOP === classInfo.MALOP)
      .map((student: any) => ({
        MASV: student.MASV,
        HOTEN: student.HOTEN,
        NGAYSINH: student.NGAYSINH,
        DIACHI: student.DIACHI,
        MALOP: student.MALOP,
        TENDN: student.TENDN,
        MATKHAU: student.MATKHAU,
      }));
    return acc;
  }, {});

  return (
    <div className="">
      <DataTable columns={columns} data={result[malop]} malop={malop}/>
    </div>
  );
};

export default Page;
