/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'standalone',
  // trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["i.pravatar.cc", "gravatar.com"],
  },
}

module.exports = nextConfig
