"use client";
import { useEffect, useState } from "react";
import { Search, ShieldCheck, UserCheck, HelpCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  title: string;
  link?: string;
  slug?: string;
  icon: React.ReactNode;
  children?: MenuItem[];
}

export const Header = () => {
  const [userEmail, setUserEmail] = useState(
    () => localStorage.getItem("userEmail") || ""
  );
  const role = localStorage.getItem("role");

  const getRoleDetails = () => {
    switch (role) {
      case "ADMIN":
        return {
          title: "Quản lý",
          icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
          bgClass: "bg-gradient-to-r from-blue-100 to-blue-200",
          textClass: "text-blue-900",
          description: "Toàn quyền quản trị hệ thống",
        };
      case "EMPLOYEE":
        return {
          title: "Nhân viên",
          icon: <UserCheck className="w-8 h-8 text-green-600" />,
          bgClass: "bg-gradient-to-r from-green-100 to-green-200",
          textClass: "text-green-900",
          description: "Thực thi nhiệm vụ chuyên môn",
        };
      default:
        return {
          title: "Chưa xác định",
          icon: <HelpCircle className="w-8 h-8 text-gray-600" />,
          bgClass: "bg-gradient-to-r from-gray-100 to-gray-200",
          textClass: "text-gray-900",
          description: "Chưa được phân quyền",
        };
    }
  };

  const roleDetails = getRoleDetails();

  return (
    <div className="flex items-center gap-20 border-b-[1px] border-solid border-neutral-300 px-10 bg-white relative">
      <div className="w-full min-h-[70px] py-1">
        <div
          className={`
      ${roleDetails.bgClass} 
      rounded-md  
      shadow-sm  
      hover:shadow-md 
      transition-all 
      duration-300 
      ease-in-out 
      transform 
      hover:-translate-y-1 
      p-2       
      flex 
      items-center 
      gap-2    
    `}
        >
          {/* Icon */}
          <div className="bg-white rounded-full p-1 shadow-sm">
            {roleDetails.icon}
          </div>

          {/* Thông tin chức vụ */}
          <div className="flex-1">
            <div className={`font-semibold text-sm ${roleDetails.textClass}`}>
              Chức vụ: {roleDetails.title}
            </div>
            <p className={`text-[10px] ${roleDetails.textClass} opacity-70`}>
              {roleDetails.description}
            </p>
          </div>

          {/* Badge quyền hạn */}
          <div
            className={`
        px-1 
        py-0.5 
        rounded-full 
        text-[8px] 
        font-medium 
        ${
          role === "ADMIN"
            ? "bg-blue-500 text-white"
            : role === "EMPLOYEE"
            ? "bg-green-500 text-white"
            : "bg-gray-500 text-white"
        }
      `}
          >
            {role}
          </div>
        </div>

        {/* Hiệu ứng nền động */}
        <div
          className="
            absolute 
            top-0 
            left-0 
            right-0 
            bottom-0 
            bg-opacity-10 
            pointer-events-none 
            animate-pulse
          "
        />
      </div>

      {userEmail && (
        <div className="!text-neutral-800">
          {/* <ProfileLogin
              userEmail={userEmail}
              setUserEmail={setUserEmail}
              link_profile={"/dashboard/thong-tin"}
              link_logout={"/dashboard/login"}
            /> */}
        </div>
      )}
    </div>
  );
};

// Component MenuLeft
export const MenuLeft = ({ menu }: { menu: MenuItem[] }) => {
  const pathname = usePathname();
  const [dropDown, setDropDown] = useState(false);

  useEffect(() => {
    setDropDown(pathname.includes("quan-ly-phong"));
  }, [pathname]);

  return (
    <>
      <div className="text-primary py-3 w-fit pl-5">{/* <Logo /> */}</div>
      <div className="h-full w-full pt-5">
        <div className="flex flex-col">
          {menu.map((item, index) => (
            <div key={item.title + index}>
              {item.link ? (
                <Link
                  href={item.link}
                  onClick={() => setDropDown(false)}
                  className={`
                    flex items-center gap-2 py-2 cursor-pointer 
                    duration-300 hover:bg-primary/90 hover:px-4 hover:text-white 
                    ${
                      pathname.includes(item.link || "")
                        ? "px-4 bg-primary/90 text-white text-title"
                        : ""
                    }
                  `}
                >
                  {item.icon}
                  <p className="text-lg">{item.title}</p>
                </Link>
              ) : (
                <>
                  <Link
                    href={"/dashboard/quan-ly-phong/phong"}
                    className={`
                      flex items-center gap-2 py-2 cursor-pointer 
                      duration-300 hover:bg-primary/90 hover:text-white hover:px-4 
                      ${
                        dropDown
                          ? "px-4 bg-primary/90 text-white text-title"
                          : ""
                      }
                    `}
                    onClick={() => setDropDown(!dropDown)}
                  >
                    {item.icon}
                    <p className="text-lg">{item.title}</p>
                  </Link>

                  {dropDown && item.children && (
                    <div className="pl-5">
                      {item.children.map((child, childIndex) => (
                        <Link
                          href={`/dashboard/quan-ly-phong/${child.link}`}
                          key={child.title + childIndex}
                          className={`
                            flex items-center gap-2 py-1 cursor-pointer 
                            duration-300 hover:text-primary text-black hover:font-bold 
                            ${
                              pathname.includes(child.slug || "")
                                ? "underline duration-300 font-bold text-title text-primary"
                                : ""
                            }
                          `}
                        >
                          {child.icon}
                          <p className="text-lg">{child.title}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
