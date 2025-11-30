"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Token mengikuti format TEMANMU
  const getAuthToken = () => {
    return typeof window !== "undefined"
      ? localStorage.getItem("authToken")
      : null;
  };

  // FETCH DATA MENGIKUTI TEMANMU
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
        }));

        setRegistrations(mapped);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  // DELETE IKUTI CARA TEMANMU
  const handleDelete = async (id, name) => {
    if (!confirm(`Yakin ingin menghapus pendaftar: ${name}?`)) return;

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

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || "Gagal menghapus pendaftar.");
      }

      setRegistrations((prev) => prev.filter((reg) => reg.id !== id));
      alert("Pendaftar berhasil dihapus.");
    } catch (err) {
      console.error(err);
      alert(err.message || "Terjadi kesalahan.");
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Memuat data...</p>
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-white to-blue-50">
      <section className="relative py-24 text-center pb-40">
        <h1 className="text-5xl md:text-7xl font-bold pt-20 bg-clip-text text-transparent bg-linear-to-l from-blue-800 via-sky-600 to-blue-900">
          PENDAFTAR TechRanger
        </h1>
      </section>

      <main className="pb-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {registrations.map((reg, index) => (
              <motion.div
                key={reg.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white/95 rounded-2xl shadow-xl border border-sky-100 overflow-hidden"
              >
                {/* HEADER */}
                <div className="bg-linear-to-r from-blue-600 to-sky-500 p-4 text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src={reg.photo}
                        alt={reg.fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold">{reg.fullName}</h2>
                      <p className="text-blue-100 text-xs">
                        Daftar:{" "}
                        {new Date(reg.registeredAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* BODY */}
                <div className="p-4 space-y-3">
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">WHATSAPP</p>
                    <p className="font-semibold text-black">{reg.whatsapp}</p>
                  </div>

                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                    <p className="text-xs text-amber-700 mb-1">ALAMAT</p>
                    <p className="text-sm text-black">{reg.address}</p>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-xl border border-blue-200">
                    <p className="text-xs text-blue-700 mb-1">KAMPUS</p>
                    <p className="text-sm text-black">{reg.campusOrigin}</p>
                  </div>

                  <div className="bg-purple-50 p-3 rounded-xl border border-purple-200">
                    <p className="text-xs text-purple-700 mb-1">PRODI</p>
                    <p className="text-sm text-black">{reg.major}</p>
                  </div>

                  <div className="bg-green-50 p-3 rounded-xl border border-green-200">
                    <p className="text-xs text-green-700 mb-1">TAHU DARI</p>
                    <p className="text-sm text-black">{reg.source}</p>
                  </div>

                  <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-200">
                    <p className="text-xs text-indigo-700 mb-1">ALASAN</p>
                    <p className="text-sm text-black">{reg.reason}</p>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="p-4">
                  <button
                    onClick={() => handleDelete(reg.id, reg.fullName)}
                    className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl"
                  >
                    Hapus Pendaftar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
