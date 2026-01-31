import { headers } from 'next/headers';

export const getClientIp = async () => {
  const header = await headers();

  return (
    header.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    header.get('x-real-ip') ??
    'unknown'
  );
};
