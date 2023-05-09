/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },
  env: {
    ENVIROMENT: process.env.ENVIROMENT,
  },
};

module.exports = nextConfig;
