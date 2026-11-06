/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  allowedDevOrigins: ['192.168.1.106'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
