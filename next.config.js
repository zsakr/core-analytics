/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,

  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'firebasestorage.googleapis.com'],
  },

  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.(ico|png|jpg|jpeg|gif|svg)$/,
      type: 'asset/resource',
    });

    // In development, ensure we have a fallback for missing chunks
    if (dev) {
      config.output = {
        ...config.output,
        publicPath: '/_next/',
      };
    }

    return config;
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  // Development indicators configuration
  devIndicators: {
    position: 'bottom-right',
  },
};

module.exports = nextConfig;
