import { axiosInstance } from "@/lib/axios";
import { DataTableDetail } from "./data-table";
import { columns } from "./columns";

const Page = async ({ params }: any) => {
  const { masv, malop } = params;

  const bangdiem: any = await axiosInstance.get("/bangdiem");
  const studentCourses = bangdiem.filter((item: any) => item.MASV === masv);
  console.log(studentCourses);

  return (
    <div className="">
      {/* <p>Bảng điểm</p> */}
      <DataTableDetail
        columns={columns}
        data={studentCourses}
        malop={malop}
        masv={masv}
      />
    </div>
  );
};

export default Page;
