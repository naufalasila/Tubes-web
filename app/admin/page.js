"use client";

import { useState, useEffect } from "react";
import { FadeIn, SlideUp } from "../../components/Animations";
import Footer from "../../components/Footer";

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil token hanya untuk operasi DELETE (karena delete butuh auth)
  const getAuthToken = () => {
    return typeof window !== "undefined"
      ? localStorage.getItem("authToken")
      : null;
  };

  // Fetch data pendaftar (tanpa token!)
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/pendaftar/all`
        );

        if (!response.ok) {
          throw new Error(`Gagal memuat data: ${response.status}`);
        }

        const data = await response.json();
        const mapped = data.map((item) => ({
          id: item.id_pendaftar,
          fullName: item.nama_lengkap || "–",
          photo: item.foto_url
            ? `${process.env.NEXT_PUBLIC_API_URL}${item.foto_url}`
            : "https://via.placeholder.com/150?text=No+Photo",
          registeredAt: item.created_at,
          whatsapp: item.no_wa || "–",
          address: item.alamat_sekarang || "–",
          residence: item.domisili || "–",
          residenceType: item.tinggal_dengan || "–",
          campusOrigin: item.asal_kampus || "–",
          major: item.prodi || "–",
          semester: item.semester || "–",
          source: item.pengetahuan_coconut || "–",
          reason: item.alasan_masuk || "–",
          status: item.status || "pending",
        }));

        setRegistrations(mapped);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Gagal mengambil data pendaftar.");
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  // Fungsi hapus pendaftar
  const handleDelete = async (id, fullName) => {
    if (!confirm(`Yakin ingin menghapus pendaftar: ${fullName}?`)) return;

    const token = getAuthToken();
    if (!token) {
      alert("Anda harus login untuk menghapus data.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pendaftar/delete?id=${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Hapus dari state
        setRegistrations((prev) => prev.filter((reg) => reg.id !== id));
        alert("Pendaftar berhasil dihapus.");
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Gagal menghapus pendaftar.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.message || "Terjadi kesalahan saat menghapus.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Memuat data pendaftar...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg max-w-md text-center">
          <p className="font-bold mb-2">❌ Error</p>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Muat Ulang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-bl from-sky-50 via-white to-blue-50">
        <section className="relative py-24 text-center pb-40">
          <div className="container mx-auto px-6">
            <FadeIn>
              <h1 className="text-5xl md:text-7xl font-bold font-playfair pt-20 py-3 bg-gradient-to-l from-blue-800 via-sky-600 to-blue-900 bg-clip-text text-transparent animate-gradient">
                PENDAFTAR TechRanger
              </h1>
            </FadeIn>
          </div>
        </section>
      </div>

      {/* Main Content */}
      <main className="relative overflow-hidden py-12">
        <div className="container mx-auto px-6">
          <SlideUp delay={200}>
            <div className="max-w-7xl mx-auto">
              {registrations.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600">Belum ada pendaftar.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {registrations.map((reg, index) => (
                    <SlideUp key={reg.id} delay={150 * index}>
                      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-sky-100 overflow-hidden">
                        {/* Header Card dengan Foto & Info Utama */}
                        <div className="bg-gradient-to-r from-blue-600 to-sky-500 p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <div className="relative w-20 h-20 rounded-xl overflow-hidden border-3 border-white shadow-lg flex-shrink-0">
                                <img
                                  src={reg.photo}
                                  alt={reg.fullName}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="text-white">
                                <h2 className="text-xl font-bold mb-1">
                                  {reg.fullName}
                                </h2>
                                <div className="flex flex-wrap gap-2 mb-2">
                                  <span className="bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-medium">
                                    Semester {reg.semester}
                                  </span>
                                  <span className="bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs">
                                    {reg.residence}
                                  </span>
                                </div>
                                <p className="text-xs text-blue-100">
                                  Daftar:{" "}
                                  {new Date(
                                    reg.registeredAt
                                  ).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Body Card - Grid Layout Padat */}
                        <div className="p-4 space-y-3">
                          {/* Kontak & Domisili */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-xl border border-gray-200">
                              <p className="text-xs font-semibold text-gray-500 mb-1">
                                WHATSAPP
                              </p>
                              <p className="text-sm font-bold text-gray-800">
                                {reg.whatsapp}
                              </p>
                            </div>
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-xl border border-gray-200">
                              <p className="text-xs font-semibold text-gray-500 mb-1">
                                TINGGAL
                              </p>
                              <p className="text-sm font-bold text-gray-800">
                                {reg.residenceType}
                              </p>
                            </div>
                          </div>

                          {/* Alamat */}
                          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-3 rounded-xl border border-amber-200">
                            <p className="text-xs font-semibold text-amber-700 mb-1">
                              ALAMAT
                            </p>
                            <p className="text-sm text-gray-800 line-clamp-1">
                              {reg.address}
                            </p>
                          </div>

                          {/* Info Akademik - 3 Kolom */}
                          <div className="grid grid-cols-3 gap-2">
                            <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-2.5 rounded-lg border border-blue-200">
                              <p className="text-xs font-semibold text-blue-600 mb-0.5">
                                KAMPUS
                              </p>
                              <p className="text-xs font-bold text-gray-800 line-clamp-2 leading-tight">
                                {reg.campusOrigin}
                              </p>
                            </div>
                            <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-2.5 rounded-lg border border-purple-200 col-span-2">
                              <p className="text-xs font-semibold text-purple-600 mb-0.5">
                                PROGRAM STUDI
                              </p>
                              <p className="text-xs font-bold text-gray-800 line-clamp-2 leading-tight">
                                {reg.major}
                              </p>
                            </div>
                          </div>

                          {/* Sumber Info */}
                          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-xl border border-green-200">
                            <p className="text-xs font-semibold text-green-700 mb-1">
                              TAHU DARI
                            </p>
                            <p className="text-sm font-medium text-gray-800">
                              {reg.source}
                            </p>
                          </div>

                          {/* Alasan Bergabung */}
                          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-3 rounded-xl border border-indigo-200">
                            <p className="text-xs font-semibold text-indigo-700 mb-1.5">
                              ALASAN BERGABUNG
                            </p>
                            <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed">
                              {reg.reason}
                            </p>
                          </div>
                        </div>

                        {/* Footer Card - Action Button */}
                        <div className="px-4 pb-4">
                          <button
                            onClick={() => handleDelete(reg.id, reg.fullName)}
                            className="w-full px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                          >
                            Hapus Pendaftar
                          </button>
                        </div>
                      </div>
                    </SlideUp>
                  ))}
                </div>
              )}
            </div>
          </SlideUp>
        </div>
      </main>

      <Footer />

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
