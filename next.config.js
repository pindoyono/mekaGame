/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // Enable static export for Electron
  images: {
    unoptimized: true,  // Required for static export
  },
  trailingSlash: true,  // Better for file:// protocol
}

module.exports = nextConfig
