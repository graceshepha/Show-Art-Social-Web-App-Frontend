/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost:8080', 's.gravatar.com'],
  },
  async redirects() {
    return [
      {
        source: '/u/:username/posts',
        destination: '/u/:username',
        permanent: true,
      }
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/assets/:path*',
          destination: `${process.env.BACKEND_API}/assets/:path*`,
        }
      ]
    }
  }
};

module.exports = nextConfig;
