"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn, SlideUp } from "../../components/Animations";
import Footer from "../../components/Footer";

export default function Registration() {
  const [formData, setFormData] = useState({
    fullName: "",
    nickname: "",
    birthPlace: "",
    birthDate: "",
    gender: "",
    email: "",
    whatsapp: "",
    telegram: "",
    address: "",
    residence: "",
    campusOrigin: "",
    major: "",
    semester: "",
    photo: null,
    reason: "",
    source: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [status, setStatus] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleGenderChange = (value) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Nama lengkap wajib diisi";
    if (!formData.nickname.trim())
      newErrors.nickname = "Nama panggilan wajib diisi";
    if (!formData.birthPlace.trim())
      newErrors.birthPlace = "Tempat lahir wajib diisi";
    if (!formData.birthDate)
      newErrors.birthDate = "Tanggal lahir wajib diisi";
    if (!formData.gender)
      newErrors.gender = "Jenis kelamin wajib dipilih";
    if (!formData.email) {
      newErrors.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }
    if (!formData.whatsapp)
      newErrors.whatsapp = "Nomor WhatsApp wajib diisi";
    if (!formData.telegram)
      newErrors.telegram = "Username Telegram wajib diisi";
    if (!formData.address.trim())
      newErrors.address = "Alamat wajib diisi";
    if (!formData.residence)
      newErrors.residence = "Pilih tempat tinggal";
    if (!formData.campusOrigin.trim())
      newErrors.campusOrigin = "Asal kampus wajib diisi";
    if (!formData.major.trim())
      newErrors.major = "Jurusan wajib diisi";
    if (!formData.semester)
      newErrors.semester = "Pilih semester";

    // Validasi foto (opsional tapi disarankan)
    if (!formData.photo) {
      // newErrors.photo = "Foto wajib diunggah"; // bisa di-comment jika optional
    } else {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!allowedTypes.includes(formData.photo.type)) {
        newErrors.photo = "Hanya file JPG, JPEG, PNG yang diperbolehkan";
      }
      if (formData.photo.size > maxSize) {
        newErrors.photo = "Ukuran file maksimal 2MB";
      }
    }

    if (!formData.reason.trim())
      newErrors.reason = "Alasan bergabung wajib diisi";
    if (!formData.source)
      newErrors.source = "Pilih sumber informasi";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitted(false);
      return;
    }

    setErrors({});
    setStatus("Mengirim...");

    try {
      // 👇 INI TEMPAT UNTUK INTEGRASI DENGAN BACKEND GOlang NANTI!
      // Contoh: POST ke /api/register
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          // Jika ingin upload file, gunakan FormData (lihat catatan di bawah)
        }),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setStatus("Pendaftaran berhasil!");
        // Reset form
        setFormData({
          fullName: "",
          nickname: "",
          birthPlace: "",
          birthDate: "",
          gender: "",
          email: "",
          whatsapp: "",
          telegram: "",
          address: "",
          residence: "",
          campusOrigin: "",
          major: "",
          semester: "",
          photo: null,
          reason: "",
          source: "",
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setStatus("Gagal mengirim data. Silakan coba lagi.");
      }
    } catch (error) {
      setStatus("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-sky-50 via-white to-blue-50">
      {/* Header Section */}
      <div className=" bg-gradient-to-bl from-sky-50 via-white to-blue-50">
        <section className="relative py-24 text-center pb-40">
          <div className="container mx-auto px-6 ">
            <FadeIn>
              <h1 className="text-5xl md:text-7xl font-bold font-playfair pt-20 py-3 bg-gradient-to-l from-blue-800 via-sky-600 to-blue-900 bg-clip-text text-transparent animate-gradient">
                Formulir
              </h1>
            </FadeIn>
            <SlideUp delay={200}>
              <p className="text-xl text-black max-w-2xl mx-auto leading-relaxed mb-10">
               Silahkan isi Formulir pendaftaran dibawah dengan data asli kalian
                <br />
                sebagai langkah awal kalian untuk bergabung
                <br />
                bersama kami di TechRanger
              </p>
            </SlideUp>
          </div>
        </section>
      </div>

      {/* Main Form */}
      <main className="relative overflow-hidden py-12">
        <div className="container mx-auto px-6">
          <SlideUp delay={200}>
            <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm p-8 md:p-10 rounded-3xl shadow-xl border border-sky-100">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-900 text-center mb-6">
                Formulir Pendaftaran
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Isi informasi dengan benar untuk bergabung dengan komunitas kami.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nama Lengkap & Nama Panggilan */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Contoh: Naufal Asila"
                      className={`w-full p-3 border rounded-lg outline-none transition text-black  focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
                        errors.fullName ? "border-red-500 bg-red-50" : ""
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Panggilan
                    </label>
                    <input
                      type="text"
                      name="nickname"
                      value={formData.nickname}
                      onChange={handleChange}
                      placeholder="Contoh: Naufal"
                      className={`w-full p-3 border rounded-lg outline-none transition text-black focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
                        errors.nickname ? "border-red-500 bg-red-50" : ""
                      }`}
                    />
                    {errors.nickname && (
                      <p className="text-red-500 text-xs mt-1">{errors.nickname}</p>
                    )}
                  </div>
                </div>

                {/* Tempat & Tanggal Lahir */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tempat Lahir
                    </label>
                    <input
                      type="text"
                      name="birthPlace"
                      value={formData.birthPlace}
                      onChange={handleChange}
                      placeholder="Contoh: Makassar"
                      className={`w-full p-3 border rounded-lg outline-none transition text-black focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
                        errors.birthPlace ? "border-red-500 bg-red-50" : ""
                      }`}
                    />
                    {errors.birthPlace && (
                      <p className="text-red-500 text-xs mt-1">{errors.birthPlace}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tanggal Lahir
                    </label>
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg outline-none transition text-black focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
                        errors.birthDate ? "border-red-500 bg-red-50" : ""
                      }`}
                    />
                    {errors.birthDate && (
                      <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">Format: YYYY-MM-DD</p>
                  </div>
                </div>

                {/* Jenis Kelamin */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis Kelamin
                  </label>
                  <div className="flex items-center space-x-6 mb-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Pria"
                        checked={formData.gender === "Pria"}
                        onChange={() => handleGenderChange("Pria")}
                        className="form-radio h-5 w-5 text-sky-600"
                      />
                      <span className="ml-2 text-gray-700">Pria</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Wanita"
                        checked={formData.gender === "Wanita"}
                        onChange={() => handleGenderChange("Wanita")}
                        className="form-radio h-5 w-5 text-sky-600"
                      />
                      <span className="ml-2 text-gray-700">Wanita</span>
                    </label>
                  </div>
                  {errors.gender && (
                    <p className="text-red-500 text-xs">{errors.gender}</p>
                  )}
                </div>

                {/* Email & WhatsApp */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nama@email.com"
                      className={`w-full p-3 border rounded-lg outline-none text-black transition focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
                        errors.email ? "border-red-500 bg-red-50" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="0812-3456-7890"
                      className={`w-full p-3 border rounded-lg outline-none transition text-black focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
                        errors.whatsapp ? "border-red-500 bg-red-50" : ""
                      }`}
                    />
                    {errors.whatsapp && (
                      <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>
                    )}
                  </div>
                </div>

                {/* Username Telegram */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username Telegram
                  </label>
                  <input
                    type="text"
                    name="telegram"
                    value={formData.telegram}
                    onChange={handleChange}
                    placeholder="@username"
                    className={`w-full p-3 border rounded-lg outline-none text-black transition focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
                      errors.telegram ? "border-red-500 bg-red-50" : ""
                    }`}
                  />
                  {errors.telegram && (
                    <p className="text-red-500 text-xs mt-1">{errors.telegram}</p>
                  )}
                </div>

                {/* Alamat & Tempat Tinggal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Alamat
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Jl. Contoh No. 123"
                      className={`w-full p-3 border rounded-lg outline-none text-black transition focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
                        errors.address ? "border-red-500 bg-red-50" : ""
                      }`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pilih Tempat Tinggal
                    </label>
                    <select
                      name="residence"
                      value={formData.residence}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg outline-none text-black transition focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
                        errors.residence ? "border-red-500 bg-red-50" : ""
                      }`}
                    >
                      <option value="">-- Pilih --</option>
                      <option value="Makassar">Makassar</option>
                      <option value="Maros">Maros</option>
                      <option value="Gowa">Gowa</option>
                      <option value="Takalar">Takalar</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                    {errors.residence && (
                      <p className="text-red-500 text-xs mt-1">{errors.residence}</p>
                    )}
                  </div>
                </div>

                {/* Asal Kampus & Jurusan */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Asal Kampus
                    </label>
                    <input
                      type="text"
                      name="campusOrigin"
                      value={formData.campusOrigin}
                      onChange={handleChange}
                      placeholder="Contoh: Universitas Muhammadiyah Makassar"
                      className={`w-full p-3 border rounded-lg outline-none transition text-black focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
                        errors.campusOrigin ? "border-red-500 bg-red-50" : ""
                      }`}
                    />
                    {errors.campusOrigin && (
                      <p className="text-red-500 text-xs mt-1">{errors.campusOrigin}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jurusan
                    </label>
                    <input
                      type="text"
                      name="major"
                      value={formData.major}
                      onChange={handleChange}
                      placeholder="Contoh: Teknik Informatika"
                      className={`w-full p-3 border rounded-lg outline-none transition text-black focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
                        errors.major ? "border-red-500 bg-red-50" : ""
                      }`}
                    />
                    {errors.major && (
                      <p className="text-red-500 text-xs mt-1">{errors.major}</p>
                    )}
                  </div>
                </div>

                {/* Semester */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Semester
                  </label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg outline-none transition text-black focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
                      errors.semester ? "border-red-500 bg-red-50" : ""
                    }`}
                  >
                    <option value="">-- Pilih Semester --</option>
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                    <option value="3">Semester 3</option>
                    <option value="4">Semester 4</option>
                    <option value="5">Semester 5</option>
                    <option value="6">Semester 6</option>
                    <option value="7">Semester 7</option>
                    <option value="8">Semester 8</option>
                    <option value="9+">Lebih dari 8</option>
                  </select>
                  {errors.semester && (
                    <p className="text-red-500 text-xs mt-1">{errors.semester}</p>
                  )}
                </div>

                {/* Unggah Foto */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unggah Foto (.jpg, .jpeg, .png, maks 2MB)
                  </label>
                  <div className="relative">
                    <input
                      ref={fileInputRef}
                      type="file"
                      name="photo"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleChange}
                      className={`w-full p-3 border border-gray-300 text-black rounded-lg cursor-pointer ${
                        errors.photo ? "border-red-500 bg-red-50" : ""
                      }`}
                    />
                    {formData.photo && (
                      <p className="text-sm text-gray-600 mt-1">
                        File terpilih: {formData.photo.name}
                      </p>
                    )}
                  </div>
                  {errors.photo && (
                    <p className="text-red-500 text-xs mt-1">{errors.photo}</p>
                  )}
                </div>

                {/* Alasan Bergabung */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alasan Bergabung
                  </label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Tulis alasan Anda ingin bergabung dengan COCONUT Computer Club..."
                    rows="4"
                    className={`w-full p-3 border rounded-lg outline-none text-black resize-none transition focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
                      errors.reason ? "border-red-500 bg-red-50" : ""
                    }`}
                  ></textarea>
                  {errors.reason && (
                    <p className="text-red-500 text-xs mt-1">{errors.reason}</p>
                  )}
                </div>

                {/* Sumber Informasi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dari mana Anda mengetahui tentang Coconut?
                  </label>
                  <select
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg outline-none text-black transition focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
                      errors.source ? "border-red-500 bg-red-50" : ""
                    }`}
                  >
                    <option value="">-- Pilih salah satu --</option>
                    <option value="Media Sosial">Media Sosial</option>
                    <option value="Teman">Teman</option>
                    <option value="Kegiatan Kampus">Kegiatan Kampus</option>
                    <option value="Website">Website</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                  {errors.source && (
                    <p className="text-red-500 text-xs mt-1">{errors.source}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="text-center pt-6">
                  <button
                    type="submit"
                    disabled={status === "Mengirim..."}
                    className={`bg-gradient-to-r from-blue-600 to-sky-600 text-white font-semibold px-8 py-3 rounded-full hover:from-blue-700 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                      status === "Mengirim..." ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {status === "Mengirim..." ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Mengirim...
                      </span>
                    ) : (
                      "DAFTAR SEKARANG"
                    )}
                  </button>
                </div>

                {/* Status Message */}
                {status && !isSubmitted && (
                  <div className="mt-4 p-3 bg-yellow-50 text-yellow-700 text-sm rounded-lg border border-yellow-200">
                    {status}
                  </div>
                )}

                {isSubmitted && (
                  <div className="mt-4 p-3 bg-green-50 text-green-700 text-sm rounded-lg border border-green-200">
                    Terima kasih! Pendaftaran Anda telah berhasil. Tim COCONUT akan menghubungi Anda melalui email atau WhatsApp.
                  </div>
                )}
              </form>
            </div>
          </SlideUp>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Animasi Gradient untuk Text */}
      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background: linear-gradient(
            90deg,
            #1e40af,
            #0ea5e9,
            #0284c7,
            #1e40af
          );
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>
    </div>
  );
}