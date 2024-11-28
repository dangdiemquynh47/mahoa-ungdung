"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // Hàm xử lý khi submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error trước khi submit
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/Auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, email, password }),
      });
    } catch (error) {
      setError("Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mr-28 py-12 px-16 space-y-8 bg-white shadow-2xl">
      <p className="text-center text-5xl font-bold text-neutral-800">
        Đăng ký tài khoản
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tên */}
        <div>
          <label
            htmlFor="name"
            className="block text-xl font-bold text-neutral-700"
          >
            Tên
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full mt-1 px-4 py-3 border border-neutral-300 focus:border-neutral-400 focus:outline-none focus:ring-none duration-300"
            placeholder="Nhập tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        {/* số điện thoại */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Số điện thoại
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Nhập sdt của bạn"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-xl font-bold text-neutral-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full mt-1 px-4 py-3 border border-neutral-300 focus:border-neutral-400 focus:outline-none focus:ring-none duration-300"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Mật khẩu */}
        <div>
          <label
            htmlFor="password"
            className="block text-xl font-bold text-neutral-700"
          >
            Mật khẩu
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full mt-1 px-4 py-3 border border-neutral-300 focus:border-neutral-400 focus:outline-none focus:ring-none duration-300"
            placeholder="Nhập mật khẩu của bạn"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Nút đăng ký */}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white text-lg font-bold bg-neutral-800 mt-10 shadow hover:bg-neutral-600 duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
                <span className="ml-2">Đang đăng ký...</span>
              </div>
            ) : (
              "Đăng Ký"
            )}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      {/* Liên kết đến trang đăng nhập */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <a href="/booking/login" className="text-indigo-500 hover:underline">
            Đăng nhập ngay
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
