/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  experimental: { appDir: true },
  env: { BASEURL: process.env.BASEURL },
};

module.exports = nextConfig;
