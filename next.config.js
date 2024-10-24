/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    PORT: "3000",
    BASE_URL: "http://152.42.252.147:5000",
  },
};

module.exports = nextConfig;
