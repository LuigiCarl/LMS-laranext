/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'imagedelivery.net'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://laravel-backend-production-f934.up.railway.app/api/:path*',
      },
    ];
  },
};

export default nextConfig;
