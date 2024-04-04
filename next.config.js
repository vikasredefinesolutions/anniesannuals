/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  //TODO: need to add all media domains
  async redirects() {
    return [
      {
        source: '/plants/test',
        destination: '/annual.html',
        permanent: true,
      },
    ];
  },
  images: {
    domains: [],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'redefinecommerce.blob.core.windows.net',
      },
      {
        protocol: 'https',
        hostname: 'www.anniesannuals.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.anniesannuals.com',
      },
    ],
  },
};

module.exports = nextConfig;
