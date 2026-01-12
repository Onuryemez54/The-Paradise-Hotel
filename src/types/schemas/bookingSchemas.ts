import { z } from 'zod';
import { ErrorKey } from '../i18n/keys';

export const bookingSchema = z.object({
  numGuests: z.string().min(1),
  observations: z
    .string()
    .max(500, { message: ErrorKey.FORM_OBSERVATION })
    .optional(),
  breakfastIncluded: z.boolean(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
