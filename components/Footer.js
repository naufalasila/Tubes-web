'use client';
import Link from 'next/link';


// Import ikon dari react-icons
import { FaYoutube, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#03166D] to-sky-600 hover:from-blue-700 hover:to-sky-700  text-white py-8 mt-12">
      <div className="container mx-auto px-6">
        
        {/* Media Sosial */}
        <div className="flex flex-wrap justify-center gap-6 text-center">
          
          {/* YouTube */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group"
          >
            <FaYoutube size={24} className="text-white group-hover:text-sky-200 transition duration-200" />
            <span className="text-xs mt-1 text-sky-100 group-hover:text-white transition duration-200">
              YouTube
            </span>
          </Link>

          {/* LinkedIn */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group"
          >
            <FaLinkedin size={24} className="text-white group-hover:text-sky-200 transition duration-200" />
            <span className="text-xs mt-1 text-sky-100 group-hover:text-white transition duration-200">
              LinkedIn
            </span>
          </Link>

          {/* Instagram */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group"
          >
            <FaInstagram size={24} className="text-white group-hover:text-sky-200 transition duration-200" />
            <span className="text-xs mt-1 text-sky-100 group-hover:text-white transition duration-200">
              Instagram
            </span>
          </Link>

          {/* Facebook */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group"
          >
            <FaFacebook size={24} className="text-white group-hover:text-sky-200 transition duration-200" />
            <span className="text-xs mt-1 text-sky-100 group-hover:text-white transition duration-200">
              Facebook
            </span>
          </Link>
        </div>

        {/* Kalimat copyright */}
        <p className="text-sky-200 text-sm text-center mt-10">
          © 2025 TechRanger Lab • Dibuat dengan{' '}
          <span className="text-red-300">❤</span> oleh{' '}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline hover:text-sky-100 transition duration-200"
          >
            TechLab
          </Link>
        </p>
      </div>
    </footer>
  );
}