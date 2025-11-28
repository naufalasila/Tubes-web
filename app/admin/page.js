"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn, SlideUp } from "../../components/Animations";
import Footer from "../../components/Footer";

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data — ganti dengan fetch ke backend Golang nanti
  const mockRegistrations = [
    {
      id: 1,
      fullName: "Agshal Hidayat Alkhair",
      nickname: "Aksal",
      photo: "/default-avatar.png", // Ganti dengan path foto asli
      registeredAt: "2025-06-10T01:03:00Z",
      birthDate: "2006-12-17",
      birthPlace: "Mamuju",
      gender: "Pria",
      email: "aksalhidayat4@gmail.com",
      whatsapp: "085757105942",
      telegram: "Yani913",
      address: "Jl. Contoh No. 123",
      residence: "Samata",
      residenceType: "Kost",
      campusOrigin: "Unismuh Makassar",
      major: "Informatika",
      semester: "1",
      source: "Instagram",
      reason: "Ingin belajar backend bersama komunitas.",
    },
    {
      id: 2,
      fullName: "Ryan Hidayat",
      nickname: "Riyan",
      photo: "/default-avatar.png",
      registeredAt: "2025-06-10T01:03:00Z",
      birthDate: "2006-01-14",
      birthPlace: "Sinjai",
      gender: "Pria",
      email: "bryen0014@gmail.com",
      whatsapp: "085531799063",
      telegram: "Ryan",
      address: "Jl. Contoh No. 456",
      residence: "Samata",
      residenceType: "Kost",
      campusOrigin: "Unismuh Makassar",
      major: "Informatika",
      semester: "1",
      source: "Instagram",
      reason: "Ingin belajar backend bersama komunitas.",
    },
    // Tambahkan lebih banyak data jika perlu
  ];

  useEffect(() => {
    // 👇 INI TEMPAT UNTUK FETCH DATA DARI BACKEND GOlang NANTI!
    // fetch("/api/admin/registrations")
    //   .then(res => res.json())
    //   .then(data => {
    //     setRegistrations(data);
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     setError("Gagal memuat data pendaftar.");
    //     setLoading(false);
    //   });

    // Untuk sekarang, gunakan mock data
    setTimeout(() => {
      setRegistrations(mockRegistrations);
      setLoading(false);
    }, 800);
  }, []);

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
    <div className=" bg-gradient-to-bl from-sky-50 via-white to-blue-50">
        <section className="relative py-24 text-center pb-40">
          <div className="container mx-auto px-6 ">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {registrations.map((reg, index) => (
                  <SlideUp key={reg.id} delay={150 * index}>
                    <div className="bg-white/95 backdrop-blur-sm p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-sky-100">
                      {/* Header: Foto & Nama */}
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-sky-400">
                          <Image
                            src={reg.photo}
                            alt={reg.fullName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-blue-900">{reg.fullName}</h2>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                              {reg.nickname}
                            </span>
                            <span className="bg-blue-200 text-blue-900 px-2 py-1 rounded-full text-xs font-medium">
                              {new Date(reg.registeredAt).toLocaleDateString()} {new Date(reg.registeredAt).toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 mt-2 text-sm text-gray-600">
                            <span>📍 {reg.birthPlace}</span>
                            <span>📅 {reg.birthDate}</span>
                          </div>
                        </div>
                      </div>

                      {/* Informasi Kontak */}
                      <div className="bg-gray-50 p-4 rounded-xl mb-4">
                        <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 7.89a2 2 0 002.828 0L21 8M5 20h14v-2a3 3 0 005.356-2.678M4 8v8l8-4 8 4V8M5 20h14v-2a3 3 0 00-5.356-2.678M4 8v8l8-4 8 4V8M5 20h14v-2a3 3 0 00-5.356-2.678M4 8v8l8-4 8 4V8" />
                          </svg>
                          Informasi Kontak
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="flex items-center text-black space-x-2">
                              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 7.89a2 2 0 002.828 0L21 8M5 20h14v-2a3 3 0 005.356-2.678M4 8v8l8-4 8 4V8M5 20h14v-2a3 3 0 00-5.356-2.678M4 8v8l8-4 8 4V8" />
                              </svg>
                              <span>Email</span>
                            </div>
                            <p className="mt-1 text-gray-800 break-all">{reg.email}</p>
                          </div>
                          <div>
                            <div className="flex items-center text-black space-x-2">
                              <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                              </svg>
                              <span>WhatsApp</span>
                            </div>
                            <p className="mt-1 text-gray-800">{reg.whatsapp}</p>
                          </div>
                          <div>
                            <div className="flex items-center text-black space-x-2">
                              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                              </svg>
                              <span>Telegram</span>
                            </div>
                            <p className="mt-1 text-gray-800">{reg.telegram}</p>
                          </div>
                          <div>
                            <div className="flex items-center text-black space-x-2">
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14a7 7 0 007 7h0a7 7 0 007-7V3a7 7 0 00-7-7h0a7 7 0 00-7 7v11z" />
                              </svg>
                              <span>Jenis Kelamin</span>
                            </div>
                            <p className="mt-1 text-gray-800">{reg.gender}</p>
                          </div>
                        </div>
                      </div>

                      {/* Tempat Tinggal */}
                      <div className="bg-yellow-50 p-4 rounded-xl mb-4">
                        <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v6m3-3a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Tempat Tinggal
                        </h3>
                        <div className="flex items-center text-black space-x-2">
                          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.995 1.995 0 01-2.828 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{reg.residence}</span>
                        </div>
                        <span className="inline-block mt-2 px-2 py-1 bg-yellow-600 text-white text-xs rounded">
                          {reg.residenceType}
                        </span>
                      </div>

                      {/* Informasi Akademik */}
                      <div className="bg-green-50 p-4 rounded-xl">
                        <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2v-7a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2zM9 12h6m-6 4h6m8-4a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h8z" />
                          </svg>
                          Informasi Akademik
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="flex items-center text-black space-x-2">
                              <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2v-7a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2zM9 12h6m-6 4h6m8-4a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h8z" />
                              </svg>
                              <span>Kampus</span>
                            </div>
                            <p className="mt-1 text-gray-800">{reg.campusOrigin}</p>
                          </div>
                          <div>
                            <div className="flex items-center text-black space-x-2">
                              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2v-7a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2zM9 12h6m-6 4h6m8-4a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h8z" />
                              </svg>
                              <span>Jurusan</span>
                            </div>
                            <p className="mt-1 text-gray-800">{reg.major}</p>
                          </div>
                          <div>
                            <div className="flex items-center text-black space-x-2">
                              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2v-7a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2zM9 12h6m-6 4h6m8-4a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h8z" />
                              </svg>
                              <span>Semester</span>
                            </div>
                            <p className="mt-1 text-gray-800">{reg.semester}</p>
                          </div>
                          <div>
                            <div className="flex items-center text-black space-x-2">
                              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2v-7a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2zM9 12h6m-6 4h6m8-4a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h8z" />
                              </svg>
                              <span>Sumber Informasi</span>
                            </div>
                            <p className="mt-1 text-gray-800">{reg.source}</p>
                          </div>
                        </div>
                      </div>

                      {/* Tombol Aksi (opsional) */}
                      <div className="mt-4 flex justify-end space-x-2">
                        <Link href={`/admin/user/${reg.id}`}>
                          <button className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded hover:bg-blue-200">
                            Detail
                          </button>
                        </Link>
                        <button className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded hover:bg-green-200">
                          Verifikasi
                        </button>
                      </div>
                    </div>
                  </SlideUp>
                ))}
              </div>

              {registrations.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-gray-600">Belum ada pendaftar.</p>
                </div>
              )}
            </div>
          </SlideUp>
        </div>
      </main>

      <Footer />

      {/* Animasi Gradient */}
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