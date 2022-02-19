/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['tailwindui.com', 'images.unsplash.com', 's.gravatar.com'],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/assets/:path*',
          destination: 'http://localhost:8080/assets/:path*'
        }
      ]
    }
  }
};

module.exports = nextConfig;
