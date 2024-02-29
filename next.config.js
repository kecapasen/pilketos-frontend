/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    PORT: "3000",
    BASE_URL: "https://api.rizzky.my.id",
  },
};

module.exports = nextConfig;
