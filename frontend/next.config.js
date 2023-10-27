/** @type {import('next').NextConfig} */
require('dotenv').config()

const BACKEND = process.env.BACKEND_HOST

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
        destination: `${BACKEND}/v1/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
