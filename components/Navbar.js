'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Cek status login
  const checkLoginStatus = () => {
    const user = localStorage.getItem('coconut_user');
    setIsLoggedIn(!!user);
  };

  useEffect(() => {
    checkLoginStatus();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  

  return (
    <nav
     className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/1  backdrop-blur-lg shadow-lg py-0'
          : 'bg-white/1  backdrop-blur-lg shadow-lg py-2'
      }`}
    >
      {/* Desktop Navbar */}
      <div className="hidden sm:flex items-center justify-between px-6 md:px-40">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-4">
            <Image
              src="/logo-new.png"
              alt="Logo Coconut - Beranda"
              width={100}
              height={100}
              priority
              className="h-15 w-auto transition-transform hover:scale-105 duration-300"
            />
          </Link>
        </div>

        <div className="flex space-x-6 text-center pl-10">
          {[
            { href: '/', label: 'Beranda' },
            { href: '/about', label: 'Tentang' },
            { href: '/activity', label: 'Registrasi' },
            { href: '/contact', label: 'Kontak' },
          ].map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative inline-block px-5 py-2 text-[18px] font-medium rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg ${
                  isActive ? 'text-[#0051FF] font-semibold' : 'text-gray-800 group'
                }`}
              >
                {item.label}
                {!isActive && (
                  <>
                    <span className="absolute inset-0 bg-grey-500 rounded-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300"></span>
                    <span className="absolute inset-0 flex items-center justify-center text-gray-800 group-hover:text-sky-600 transition-colors duration-300 pointer-events-none">
                      {item.label}
                    </span>
                  </>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Header: Hamburger di kanan, Logo di kiri */}
      <div className="sm:hidden flex items-center justify-between px-4 ">
        <Link href="/" className="flex items-center space-x-">
          <Image
            src="/logo-new.png"
            alt="Logo Coconut"
            width={100}
            height={100}
            className="h-8 w-auto"
          />
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
          aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="sm:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-2 text-center">
            {[
              { href: '/', label: 'Beranda' },
              { href: '/about', label: 'Tentang' },
              { href: '/activity', label: 'Aktivitas' },
              { href: '/contact', label: 'Kontak' },
            ].map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-base font-medium rounded-lg transition ${
                    isActive
                      ? 'bg-sky-600 text-white'
                      : 'text-gray-800 hover:bg-sky-100 hover:text-sky-800'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="flex justify-center space-x-4 mt-4">
              
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}