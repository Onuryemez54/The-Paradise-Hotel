import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        'https://apygptauggadmeqtsrcb.supabase.co/storage/v1/object/public/room-images/**'
      ),
      new URL(
        'https://apygptauggadmeqtsrcb.supabase.co/storage/v1/object/public/avatars/**'
      ),
      new URL('https://lh3.googleusercontent.com/**'),
    ],
  },
};

export default withNextIntl(nextConfig);
