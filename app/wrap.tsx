"use client";
// import { UserProvider } from "@/components/contexts/UserContext";
// import { AuthProvider } from "@/components/contexts/useAuthToken";
// import { AuthProviderAdmin } from "@/components/contexts/useAuthTokenAdmin";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Header, MenuLeft } from "../components";

const WrapDashBoard = ({ children, menu }: any) => {
  return (
    <div className={"flex gap-10 relative h-full "}>
      <div className="w-[20%]">
        <div className="w-[20%] z-[12] h-screen bg-white fixed top-0 left-0 border-r-[1px] border-solid border-neutral-300">
          <MenuLeft menu={menu} />
        </div>
      </div>

      <div className={" relative w-[80%]"}>
        <div className="z-[11] fixed top-0 right-0 w-[80%] bg-white">
          <Header />
        </div>

        <main
          className={
            "mt-20 min-h-[calc(100vh-112px)] bg-white rounded-md mr-8 mb-8"
          }
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default WrapDashBoard;
