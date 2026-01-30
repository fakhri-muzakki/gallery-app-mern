import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ckwojbfxjohpfoeggcxo.supabase.co", // sesuaikan dengan linknya
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api-gallery-image.vercel.app/api/:path*",
      },
    ];
  },
};

export default nextConfig;
