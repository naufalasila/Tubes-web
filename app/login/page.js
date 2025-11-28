"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn, SlideUp } from "../../components/Animations";


export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim())
      newErrors.username = "Username wajib diisi";
    if (!formData.password)
      newErrors.password = "Password wajib diisi";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus("");
      return;
    }

    setErrors({});
    setLoading(true);
    setStatus("Memproses...");

    try {
      // 👇 INI TEMPAT UNTUK INTEGRASI DENGAN BACKEND GOlang NANTI!
      // Contoh: POST ke /api/auth/login
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Login berhasil!");
        // Redirect ke dashboard admin
        setTimeout(() => {
          window.location.href = "/admin"; // atau router.push('/admin') jika pakai Next.js App Router
        }, 1500);
      } else {
        const data = await res.json();
        setStatus(data.message || "Login gagal. Periksa username/password.");
      }
    } catch (error) {
      setStatus("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex items-center justify-center p-4">
      {/* Login Card */}
      <SlideUp delay={200}>
        <div className="w-150 max-w-md bg-white/95 backdrop-blur-sm p-8 rounded-3xl shadow-xl border  border-sky-100">
          {/* Logo */}
          <div className="text-center mb-6">
            <div className="inline-block">
              {/* 🔥 TEMPAT LOGO — GANTI DENGAN LOGO ASLI MU NANTI */}
              <Image
                src="/logo-new.png" // Ganti dengan path logo kamu
                alt="Coconut Computer Club"
                width={150}
                height={60}
                className="mx-auto"
              />
            </div>
          </div>

          {/* Welcome Text */}
          <FadeIn>
            <h1 className="text-2xl md:text-3xl font-bold text-blue-900 text-center mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Login to access your admin dashboard
            </p>
          </FadeIn>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className={`w-full p-3 border rounded-lg outline-none text-black transition focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
                  errors.username ? "border-red-500 bg-red-50" : ""
                }`}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-blue-900 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full p-3 border rounded-lg outline-none text-black transition focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
                    errors.password ? "border-red-500 bg-red-50" : ""
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    const input = document.querySelector('input[name="password"]');
                    input.type = input.type === "password" ? "text" : "password";
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Status Message */}
            {status && (
              <div
                className={`mt-4 p-3 text-sm rounded-lg ${
                  status.includes("berhasil")
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {status}
              </div>
            )}

            {/* Login Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-blue-600 to-sky-600 text-white font-semibold py-3 rounded-full hover:from-blue-700 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  loading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          
        </div>
      </SlideUp>

     
    </div>
  );
}