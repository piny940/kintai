/** @type {import('next').NextConfig} */

const envPath =
  process.env.NODE_ENV === 'production' ? '.env' : '.env.development'
require('dotenv').config({ path: envPath })

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
        destination: `${process.env.BACKEND_HOST}/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
