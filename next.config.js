/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  },
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'firebasestorage.googleapis.com'],
  },
  basePath: '',

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
