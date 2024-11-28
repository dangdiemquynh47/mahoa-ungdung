import { Payment, columns } from "./colums";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      STT: 1,
      MASV: "SV001",
      HOTEN: "Nguyễn Văn A",
      NGAYSINH: "2000-01-01",
      DIACHI: "Hà Nội",
      MALOP: "CNTT1",
    },
    {
      STT: 2,
      MASV: "SV002",
      HOTEN: "Lê Thị B",
      NGAYSINH: "1999-12-31",
      DIACHI: "Hồ Chí Minh",
      MALOP: "QTKD2",
    },
    {
      STT: 3,
      MASV: "SV003",
      HOTEN: "Trần Văn C",
      NGAYSINH: "2001-03-15",
      DIACHI: "Đà Nẵng",
      MALOP: "DHTV3",
    },
    {
      STT: 4,
      MASV: "SV004",
      HOTEN: "Phạm Thị D",
      NGAYSINH: "2002-05-20",
      DIACHI: "Hải Phòng",
      MALOP: "KHXH4",
    },
    {
      STT: 5,
      MASV: "SV005",
      HOTEN: "Hoàng Văn E",
      NGAYSINH: "2003-07-25",
      DIACHI: "Cần Thơ",
      MALOP: "CNT5",
    },
    {
      STT: 6,
      MASV: "SV006",
      HOTEN: "Vũ Thị F",
      NGAYSINH: "2004-09-10",
      DIACHI: "Bình Dương",
      MALOP: "QTKD6",
    },
    {
      STT: 7,
      MASV: "SV007",
      HOTEN: "Đặng Văn G",
      NGAYSINH: "2005-11-05",
      DIACHI: "Đồng Nai",
      MALOP: "DHTV7",
    },
    {
      STT: 8,
      MASV: "SV008",
      HOTEN: "Bùi Thị H",
      NGAYSINH: "2006-01-20",
      DIACHI: "Bà Rịa-Vũng Tàu",
      MALOP: "KHXH8",
    },
    {
      STT: 9,
      MASV: "SV009",
      HOTEN: "Nguyễn Thị I",
      NGAYSINH: "2007-03-05",
      DIACHI: "Nha Trang",
      MALOP: "CNT9",
    },
    {
      STT: 10,
      MASV: "SV010",
      HOTEN: "Lê Văn K",
      NGAYSINH: "2008-05-20",
      DIACHI: "Huế",
      MALOP: "QTKD10",
    },
  ];
}

export default async function Page() {
  const data = await getData();



  return (
    <div className=" py-10">
      <DataTable columns={columns} data={data}/>
    </div>
  );
}
