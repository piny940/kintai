/** @type {import('next').NextConfig} */
require('dotenv').config()

console.log(process.env.BACKEND_HOST)
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['storage.googleapis.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_HOST}/v1/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
