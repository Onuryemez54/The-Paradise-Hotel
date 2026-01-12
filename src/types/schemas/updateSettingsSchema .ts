import { z } from 'zod';
import { ErrorKey } from '@/types/i18n/keys';

export const updateSettingsSchema = z.object({
  fullName: z.string().min(2, { message: ErrorKey.MIN_2 }),

  email: z.string().email({ message: ErrorKey.INVALID_EMAIL }),

  nationality: z.string().min(1, { message: ErrorKey.REQUIRED }),

  nationalID: z.string().optional().or(z.literal('')),

  countryFlag: z.string().optional().or(z.literal('')),
});

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
