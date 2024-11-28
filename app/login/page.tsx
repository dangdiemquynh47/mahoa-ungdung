import Image from "next/image";
import LoginForm from "./login_form";

const Page = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <Image
        src={"/images/login.jpg"}
        alt="img"
        height={720}
        width={1440}
        unoptimized
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 bg-neutral-800/40 w-full h-full"></div>
      <div className="absolute top-[50%] left-[15%] -translate-y-[50%] -translate-x-[15%] w-[40%]">
        <p className="text-6xl text-white font-bold pb-10">Chào mừng trở lại!</p>
        <p className="text-xl text-white pr-20">
          Rất vui khi được phục vụ bạn lần nữa. <br />Hãy tiếp tục khám phá và tìm
          ngay phòng nghỉ phù hợp cho chuyến đi của bạn nhé!
        </p>
      </div>
      <div className="absolute top-[50%] -translate-y-[50%] right-0 w-[50%] flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;