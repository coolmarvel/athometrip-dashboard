/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['kr.object.ncloudstorage.com'],
  },
  // async rewrites() {
  //   return [{ source: '/api/tickets/:path*', destination: 'http://localhost:3000/api/:path*' }];
  // },
  reactStrictMode: true,
};

module.exports = nextConfig;
