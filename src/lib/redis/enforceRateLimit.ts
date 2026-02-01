import { rateLimit } from './rateLimit';
import { getClientIp } from './getClientIp';
import { ErrorKey } from '@/types/i18n/keys';
import crypto from 'crypto';
import { ActionResultType } from '../errors/helpers/handleAppError';

type RateLimitParams = {
  action: 'send-feedback';
  email: string;
};

export const enforceRateLimit = async ({
  action,
  email,
}: RateLimitParams): Promise<ActionResultType> => {
  const ip = await getClientIp();

  const emailHash = crypto
    .createHash('sha256')
    .update(email.toLowerCase())
    .digest('hex');

  const key = `${action}:${ip}:${emailHash}`;

  const allowed = await rateLimit(key);

  if (!allowed) {
    return { ok: false, error: ErrorKey.TOO_MANY_REQUESTS };
  }

  return { ok: true };
};
