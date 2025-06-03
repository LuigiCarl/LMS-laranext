/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'imagedelivery.net'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://ourbackend.infinityfreeapp.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;
