"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn, SlideUp } from "../../components/Animations";
import Footer from "../../components/Footer";

export default function Registration() {
  const [formData, setFormData] = useState({
    nama_lengkap: "",
    nama_panggilan: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    email: "",
    no_wa: "",
    username_telegram: "",
    alamat_sekarang: "",
    domisili: "",
    asal_kampus: "",
    prodi: "",
    semester: "",
    foto: null,
    alasan_masuk: "",
    pengetahuan_coconut: "",
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

  const handleJenisKelaminChange = (value) => {
    setFormData((prev) => ({ ...prev, jenis_kelamin: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nama_lengkap.trim())
      newErrors.nama_lengkap = "Nama lengkap wajib diisi";
    if (!formData.no_wa) newErrors.no_wa = "Nomor WhatsApp wajib diisi";
    if (!formData.username_telegram)
      newErrors.username_telegram = "Username Telegram wajib diisi";
    if (!formData.alamat_sekarang.trim())
      newErrors.alamat_sekarang = "Alamat wajib diisi";
    if (!formData.domisili) newErrors.domisili = "Pilih tempat tinggal";
    if (!formData.asal_kampus.trim())
      newErrors.asal_kampus = "Asal kampus wajib diisi";
    if (!formData.prodi.trim()) newErrors.prodi = "Jurusan wajib diisi";
    if (!formData.semester) newErrors.semester = "Pilih semester";
    if (!formData.alasan_masuk.trim())
      newErrors.alasan_masuk = "Alasan bergabung wajib diisi";
    if (!formData.pengetahuan_coconut)
      newErrors.pengetahuan_coconut = "Pilih sumber informasi";

    // Validasi foto — WAJIB karena backend require
    if (!formData.foto) {
      newErrors.foto = "Foto wajib diunggah";
    } else {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!allowedTypes.includes(formData.foto.type)) {
        newErrors.foto = "Hanya file JPG, JPEG, PNG yang diperbolehkan";
      }
      if (formData.foto.size > maxSize) {
        newErrors.foto = "Ukuran file maksimal 2MB";
      }
    }

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
      const form = new FormData();

      // Kirim field sesuai nama yang diharapkan backend
      form.append("nama_lengkap", formData.nama_lengkap);
      form.append("asal_kampus", formData.asal_kampus);
      form.append("prodi", formData.prodi);
      form.append("semester", formData.semester);
      form.append("no_wa", formData.no_wa);
      form.append("domisili", formData.domisili);
      form.append("alamat_sekarang", formData.alamat_sekarang);
      form.append("alasan_masuk", formData.alasan_masuk);
      form.append("pengetahuan_coconut", formData.pengetahuan_coconut);

      // Field opsional (backend tidak pakai, tapi kirim saja jika ada)
      if (formData.nama_panggilan)
        form.append("nama_panggilan", formData.nama_panggilan);
      if (formData.tempat_lahir)
        form.append("tempat_lahir", formData.tempat_lahir);
      if (formData.tanggal_lahir)
        form.append("tanggal_lahir", formData.tanggal_lahir);
      if (formData.jenis_kelamin)
        form.append("jenis_kelamin", formData.jenis_kelamin);
      if (formData.email) form.append("email", formData.email);
      if (formData.username_telegram)
        form.append("username_telegram", formData.username_telegram);

      // Foto wajib
      if (formData.foto) {
        form.append("foto", formData.foto);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pendaftar/create`,
        {
          method: "POST",
          body: form,
          // ⚠️ JANGAN set Content-Type — biarkan browser set otomatis dengan boundary
        }
      );

      if (res.ok) {
        setIsSubmitted(true);
        setStatus("Pendaftaran berhasil!");

        // Reset form
        setFormData({
          nama_lengkap: "",
          nama_panggilan: "",
          tempat_lahir: "",
          tanggal_lahir: "",
          jenis_kelamin: "",
          email: "",
          no_wa: "",
          username_telegram: "",
          alamat_sekarang: "",
          domisili: "",
          asal_kampus: "",
          prodi: "",
          semester: "",
          foto: null,
          alasan_masuk: "",
          pengetahuan_coconut: "",
        });

        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        const errorText = await res.text();
        setStatus(`Gagal: ${errorText || "Silakan coba lagi."}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("Terjadi kesalahan jaringan. Silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-blue-50">
      {/* Header Section */}
      <div className="bg-linear-to-bl from-sky-50 via-white to-blue-50">
        <section className="relative py-24 text-center pb-40">
          <div className="container mx-auto px-6">
            <FadeIn>
              <h1 className="text-5xl md:text-7xl font-bold font-playfair pt-20 py-3 bg-linear-to-l from-blue-800 via-sky-600 to-blue-900 bg-clip-text text-transparent animate-gradient">
                Formulir
              </h1>
            </FadeIn>
            <SlideUp delay={200}>
              <p className="text-xl text-black max-w-2xl mx-auto leading-relaxed mb-10">
                Silahkan isi Formulir pendaftaran dibawah dengan data asli
                kalian
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
                Isi informasi dengan benar untuk bergabung dengan komunitas
                kami.
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
                      name="nama_lengkap"
                      value={formData.nama_lengkap}
                      onChange={handleChange}
                      placeholder="Contoh: Naufal Asila"
                      className={`w-full p-3 border rounded-lg outline-none transition text-black focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
                        errors.nama_lengkap ? "border-red-500 bg-red-50" : ""
                      }`}
                    />
                    {errors.nama_lengkap && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.nama_lengkap}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Panggilan
                    </label>
                    <input
                      type="text"
                      name="nama_panggilan"
                      value={formData.nama_panggilan}
                      onChange={handleChange}
                      placeholder="Contoh: Naufal"
                      className="w-full p-3 border rounded-lg outline-none transition text-black focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                    />
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
                      name="tempat_lahir"
                      value={formData.tempat_lahir}
                      onChange={handleChange}
                      placeholder="Contoh: Makassar"
                      className="w-full p-3 border rounded-lg outline-none transition text-black focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tanggal Lahir
                    </label>
                    <input
                      type="date"
                      name="tanggal_lahir"
                      value={formData.tanggal_lahir}
                      onChange={handleChange}
                      className="w-full p-3 border rounded-lg outline-none transition text-black focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Format: YYYY-MM-DD
                    </p>
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
                        name="jenis_kelamin"
                        value="Pria"
                        checked={formData.jenis_kelamin === "Pria"}
                        onChange={() => handleJenisKelaminChange("Pria")}
                        className="form-radio h-5 w-5 text-sky-600"
                      />
                      <span className="ml-2 text-gray-700">Pria</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="jenis_kelamin"
                        value="Wanita"
                        checked={formData.jenis_kelamin === "Wanita"}
                        onChange={() => handleJenisKelaminChange("Wanita")}
                        className="form-radio h-5 w-5 text-sky-600"
                      />
                      <span className="ml-2 text-gray-700">Wanita</span>
                    </label>
                  </div>
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
                      className="w-full p-3 border rounded-lg outline-none text-black transition focus:ring-2 focus:ring-sky-400 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor WhatsApp
                    </label>
                    <input
                      type="tel"
                      name="no_wa"
                      value={formData.no_wa}
                      onChange={handleChange}
                      placeholder="0812-3456-7890"
                      className={`w-full p-3 border rounded-lg outline-none transition text-black focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
                        errors.no_wa ? "border-red-500 bg-red-50" : ""
                      }`}
                    />
                    {errors.no_wa && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.no_wa}
                      </p>
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
                    name="username_telegram"
                    value={formData.username_telegram}
                    onChange={handleChange}
                    placeholder="@username"
                    className={`w-full p-3 border rounded-lg outline-none text-black transition focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
                      errors.username_telegram ? "border-red-500 bg-red-50" : ""
                    }`}
                  />
                  {errors.username_telegram && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.username_telegram}
                    </p>
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
                      name="alamat_sekarang"
                      value={formData.alamat_sekarang}
                      onChange={handleChange}
                      placeholder="Jl. Contoh No. 123"
                      className={`w-full p-3 border rounded-lg outline-none text-black transition focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
                        errors.alamat_sekarang ? "border-red-500 bg-red-50" : ""
                      }`}
                    />
                    {errors.alamat_sekarang && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.alamat_sekarang}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pilih Tempat Tinggal
                    </label>
                    <select
                      name="domisili"
                      value={formData.domisili}
                      onChange={handleChange}
                      className={`w-full p-3 border rounded-lg outline-none text-black transition focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
                        errors.domisili ? "border-red-500 bg-red-50" : ""
                      }`}
                    >
                      <option value="">-- Pilih --</option>
                      <option value="Makassar">Makassar</option>
                      <option value="Maros">Maros</option>
                      <option value="Gowa">Gowa</option>
                      <option value="Takalar">Takalar</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                    {errors.domisili && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.domisili}
                      </p>
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
                      name="asal_kampus"
                      value={formData.asal_kampus}
                      onChange={handleChange}
                      placeholder="Contoh: Universitas Muhammadiyah Makassar"
                      className={`w-full p-3 border rounded-lg outline-none transition text-black focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
                        errors.asal_kampus ? "border-red-500 bg-red-50" : ""
                      }`}
                    />
                    {errors.asal_kampus && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.asal_kampus}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jurusan
                    </label>
                    <input
                      type="text"
                      name="prodi"
                      value={formData.prodi}
                      onChange={handleChange}
                      placeholder="Contoh: Teknik Informatika"
                      className={`w-full p-3 border rounded-lg outline-none transition text-black focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
                        errors.prodi ? "border-red-500 bg-red-50" : ""
                      }`}
                    />
                    {errors.prodi && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.prodi}
                      </p>
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
                    <p className="text-red-500 text-xs mt-1">
                      {errors.semester}
                    </p>
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
                      name="foto"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleChange}
                      className={`w-full p-3 border border-gray-300 text-black rounded-lg cursor-pointer ${
                        errors.foto ? "border-red-500 bg-red-50" : ""
                      }`}
                    />
                    {formData.foto && (
                      <p className="text-sm text-gray-600 mt-1">
                        File terpilih: {formData.foto.name}
                      </p>
                    )}
                  </div>
                  {errors.foto && (
                    <p className="text-red-500 text-xs mt-1">{errors.foto}</p>
                  )}
                </div>

                {/* Alasan Bergabung */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alasan Bergabung
                  </label>
                  <textarea
                    name="alasan_masuk"
                    value={formData.alasan_masuk}
                    onChange={handleChange}
                    placeholder="Tulis alasan Anda ingin bergabung dengan TechRanger..."
                    rows="4"
                    className={`w-full p-3 border rounded-lg outline-none text-black resize-none transition focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
                      errors.alasan_masuk ? "border-red-500 bg-red-50" : ""
                    }`}
                  ></textarea>
                  {errors.alasan_masuk && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.alasan_masuk}
                    </p>
                  )}
                </div>

                {/* Sumber Informasi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dari mana Anda mengetahui tentang TechRanger?
                  </label>
                  <select
                    name="pengetahuan_coconut"
                    value={formData.pengetahuan_coconut}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg outline-none text-black transition focus:ring-2 focus:ring-sky-400 focus:border-transparent ${
                      errors.pengetahuan_coconut
                        ? "border-red-500 bg-red-50"
                        : ""
                    }`}
                  >
                    <option value="">-- Pilih salah satu --</option>
                    <option value="Media Sosial">Media Sosial</option>
                    <option value="Teman">Teman</option>
                    <option value="Kegiatan Kampus">Kegiatan Kampus</option>
                    <option value="Website">Website</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                  {errors.pengetahuan_coconut && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.pengetahuan_coconut}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="text-center pt-6">
                  <button
                    type="submit"
                    disabled={status === "Mengirim..."}
                    className={`bg-linear-to-r from-blue-600 to-sky-600 text-white font-semibold px-8 py-3 rounded-full hover:from-blue-700 hover:to-sky-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                      status === "Mengirim..."
                        ? "opacity-75 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {status === "Mengirim..." ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
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
                    Terima kasih! Pendaftaran Anda telah berhasil. Tim
                    TechRanger akan menghubungi Anda melalui email atau
                    WhatsApp.
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
