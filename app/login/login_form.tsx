"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, getSession } from "next-auth/react";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const setUserId = (id: string) => {
    localStorage.setItem("userId", id);
  };
  const router = useRouter();
  //   const { accessToken, setTokens } = useAuthToken();
  // Xử lý đăng nhập với Google
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Đăng nhập với Google để lấy thông tin người dùng
      const result = await signIn("google", {
        redirect: false,
      });

      if (result?.error) {
        throw new Error("Đăng nhập Google không thành công");
      }

      // 2. Lấy thông tin session sau khi đăng nhập Google
      const session = await getSession();

      if (!session?.user?.email || !session?.user?.name) {
        throw new Error("Không thể lấy thông tin người dùng từ Google");
      }

      // 3. Gọi API của bạn với thông tin email và tên
      const response = await fetch(`${apiUrl}/Auth/google-signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email,
          tenND: session.user.name,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Đăng nhập không thành công!");
      }

      const data = await response.json();
      const { accessToken, refreshToken } = data.data.tokenResponse;

      // 4. Lưu tokens và email
      //   setTokens(accessToken, refreshToken);
      //document.cookie = `userEmail=${session.user.email}; path=/; max-age=3600; secure; SameSite=Strict`;
      //setUserEmail(session.user.email);

      if (response.ok) {
        const userId = data.data.tokenResponse.account.id;
        const userEmail = data.data.tokenResponse.account.email;
        // Lưu userId vào localStorage
        localStorage.setItem("userEmail", userEmail);
        localStorage.setItem("userId", userId);
      }
      // 5. Chuyển hướng người dùng và xóa session NextAuth
      router.push("/booking");
    } catch (err: any) {
      setError(err.message);
      console.error("Google login error:", err);
    } finally {
      setLoading(false);
    }
  };

  //   useEffect(() => {
  //     if (accessToken) {
  //       router.push("/booking");
  //     }
  //   }, [accessToken, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.errorMessage || "Đăng nhập không thành công!"
        );
      }

      const data = await response.json();
      //   setTokens(data.data.tokenResponse.accessToken, data.data.tokenResponse.refreshToken);
      //document.cookie = `userEmail=${data.data.tokenResponse.account.email}; path=/; max-age=3600; secure; SameSite=Strict`;
      //setUserEmail(email);

      if (response.ok) {
        const userId = data.data.tokenResponse.account.id;
        const userEmail = data.data.tokenResponse.account.email;
        // Lưu userId vào localStorage
        localStorage.setItem("userId", userId);
        localStorage.setItem("userEmail", userEmail);
      }

      router.push("/booking"); // Điều hướng đến trang booking
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mr-28 py-12 px-16 space-y-8 bg-white shadow-2xl">
      {/* Header */}
      <p className="text-center text-5xl font-bold text-neutral-800">
        Đăng nhập
      </p>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-xl font-bold text-neutral-700 mb-1"
          >
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 border border-neutral-300 focus:border-neutral-400 focus:outline-none focus:ring-none duration-300"
              placeholder="example@gamil.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-xl font-bold text-neutral-700 mb-1"
          >
            Mật khẩu
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3 border border-neutral-300 focus:border-neutral-400 focus:outline-none focus:ring-none duration-300"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Remember me & Forgot password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center cursor-pointer">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 cursor-pointer !rounded-[0px] focus:ring-blue-500 border-gray-300"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block cursor-pointer text-sm text-neutral-500"
            >
              Ghi nhớ đăng nhập
            </label>
          </div>
          <a
            href="#"
            className="text-md font-medium text-blue-600 underline duration-300 hover:text-blue-400"
          >
            Quên mật khẩu?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-3 text-white text-lg font-bold bg-neutral-800 hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
              <span className="ml-2">Đang đăng nhập...</span>
            </div>
          ) : (
            "Đăng nhập"
          )}
        </button>
      </form>

      <div className="relative">
        <div className="w-full h-[1px] bg-neutral-300"></div>
        <div className="absolute top-0 -translate-y-[50%] px-2 bg-white text-md text-neutral-500 left-[50%] -translate-x-[50%]">
          Hoặc
        </div>
      </div>
      {/* Google Login Button */}
      <button
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 hover:bg-neutral-100 transition-colors duration-300"
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE27mIXD4a78-ibA0XDp_z3XQ5GaXYeUFfDQ&s"
          alt="Google"
          className="w-6 h-6"
        />
        <span className="text-gray-700 text-md font-medium">
          {loading ? "Đang xử lý..." : "Đăng nhập với Google"}
        </span>
      </button>

      {/* Error Message */}
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      {/* Sign up link */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <a
            href="register"
            className="text-md font-medium text-blue-600 underline duration-300 hover:text-blue-400"
          >
            Đăng ký ngay
          </a>
        </p>

        <p className="text-sm text-gray-600">
          Kích hoạt tài khoản chưa?{" "}
          <a
            href="kich-hoat-tai-khoan"
            className="text-md font-medium text-blue-600 underline duration-300 hover:text-blue-400"
          >
            Kích hoạt ngay
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
