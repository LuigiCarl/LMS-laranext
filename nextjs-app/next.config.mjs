/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'imagedelivery.net'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://laravel-backend-production-ea0e.up.railway.app/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
