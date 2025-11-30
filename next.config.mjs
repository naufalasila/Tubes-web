/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["storage.googleapis.com"],

    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5012",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
