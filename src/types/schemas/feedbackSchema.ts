import z from 'zod';
import { ErrorKey, FeedbackTopicKey } from '../i18n/keys';

export const feedbackSchema = z.object({
  topic: z.enum(Object.values(FeedbackTopicKey)),

  name: z.string().min(1, { message: ErrorKey.FORM_NAME }),

  email: z
    .string()
    .min(1, { message: ErrorKey.FORM_EMAIL_REQUIRED })
    .email({ message: ErrorKey.FORM_EMAIL }),

  message: z
    .string()
    .min(10, { message: ErrorKey.FORM_MESSAGE_MIN_LENGTH })
    .max(500, { message: ErrorKey.FORM_MESSAGE_MAX_LENGTH }),

  company: z.string().optional(), // Honeypot field
});

export type FeedbackInput = z.infer<typeof feedbackSchema>;
