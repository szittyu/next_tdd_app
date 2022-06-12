/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "cdn.chec.io"],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
