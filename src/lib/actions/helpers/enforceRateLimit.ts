import { rateLimit } from './rateLimit';
import { getClientIp } from './getClientIp';
import { ErrorKey } from '@/types/i18n/keys';

type RateLimitParams = {
  action: 'send-feedback';
  email: string;
};

export const enforceRateLimit = async ({ action, email }: RateLimitParams) => {
  const ip = await getClientIp();

  const key = `${action}:${ip}:${email}`;

  const allowed = rateLimit(key);

  if (!allowed) {
    throw new Error(ErrorKey.TOO_MANY_REQUESTS);
  }

  return true;
};
