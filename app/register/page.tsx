import Image from "next/image";
import RegisterForm from "./register_form";

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
        <p className="text-6xl text-white font-bold pb-10 pr-20">
          Chào mừng bạn đã gia nhập!
        </p>
        <p className="text-xl text-white pr-20">
          Cảm ơn bạn đã tin tưởng lựa chọn chúng tôi. <br /> Hãy khám phá và tìm ngay
          phòng nghỉ lý tưởng cho chuyến đi của bạn!"
        </p>
      </div>
      <div className="absolute top-[50%] -translate-y-[50%] right-0 w-[50%] flex items-center justify-center">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Page;
