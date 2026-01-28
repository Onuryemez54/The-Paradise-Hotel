import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apygptauggadmeqtsrcb.supabase.co',
        pathname: '/storage/v1/object/public/room-images/**',
      },
      {
        protocol: 'https',
        hostname: 'apygptauggadmeqtsrcb.supabase.co',
        pathname: '/storage/v1/object/public/avatars/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
