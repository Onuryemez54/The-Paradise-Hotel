import { rateLimit } from './rateLimit';
import { getClientIp } from './getClientIp';
import { ErrorKey } from '@/types/i18n/keys';
import crypto from 'crypto';

type RateLimitParams = {
  action: 'send-feedback';
  email: string;
};

export const enforceRateLimit = async ({ action, email }: RateLimitParams) => {
  const ip = await getClientIp();

  const emailHash = crypto
    .createHash('sha256')
    .update(email.toLowerCase())
    .digest('hex');

  const key = `${action}:${ip}:${emailHash}`;

  const allowed = await rateLimit(key);

  if (!allowed) {
    throw new Error(ErrorKey.TOO_MANY_REQUESTS);
  }

  return true;
};
