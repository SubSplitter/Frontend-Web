/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'server',
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
