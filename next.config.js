/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    PORT: "3000",
    BASE_URL: "http://localhost:5000",
  },
};

module.exports = nextConfig;
