"use client";
import {
  House,
  HousePlug,
  UserRound,
  Ticket,
  Speech,
  CircleDollarSign,
  IdCard,
  BarChart,
  Star,
  Building,
  ShieldCheck,
  Sofa,
  CreditCard,
} from "lucide-react";
import "./globals.css";
import WrapDashBoard from "./wrap";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menu = [
    {
      id: 10,
      title: "Quản lý lớp học",
      link: "/quan-ly-lop-hoc",
      icon: <CreditCard className="w-6 h-6 stroke-white" />,
    },
    {
      id: 14,
      title: "Quản lý nhân viên",
      link: "/quan-ly-nhan-vien",
      icon: <Star className="w-6 h-6 stroke-white" />,
    },
  ];

  return (
    <html lang="vi">
      <body className="bg-white min-h-screen">
        <WrapDashBoard children={children} menu={menu} />
      </body>
    </html>
  );
}
