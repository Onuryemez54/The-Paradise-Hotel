import { redis } from './redis';

const WINDOW_SECONDS = 60;
const MAX_REQUESTS = 2;

export const rateLimit = async (key: string) => {
  const redisKey = `ratelimit:${key}`;

  const count = await redis.incr(redisKey);

  if (count === 1) {
    await redis.expire(redisKey, WINDOW_SECONDS);
  }

  return count <= MAX_REQUESTS;
};
