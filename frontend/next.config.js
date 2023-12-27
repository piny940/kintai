/** @type {import('next').NextConfig} */

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env.development' })
}
process.env.BACKEND_HOST ||=
  'http://kintai-backend.default.svc.cluster.local:4400'

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
