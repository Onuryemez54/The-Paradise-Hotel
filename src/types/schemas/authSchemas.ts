import { z } from 'zod';
import { ErrorKey } from '../i18n/keys';

//login schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: ErrorKey.FORM_EMAIL_REQUIRED })
    .email({ message: ErrorKey.FORM_EMAIL }),
  password: z.string().min(6, { message: ErrorKey.FORM_PASSWORD }),
});

export type LoginInput = z.infer<typeof loginSchema>;

//register schema
export const registerSchema = z
  .object({
    fullName: z.string().min(2, { message: ErrorKey.FORM_NAME }),
    email: z
      .string()
      .min(1, { message: ErrorKey.FORM_EMAIL_REQUIRED })
      .email({ message: ErrorKey.FORM_EMAIL }),
    password: z.string().min(6, { message: ErrorKey.FORM_PASSWORD }),
    confirmPassword: z.string().min(6, {
      message: ErrorKey.FORM_PASSWORD,
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ErrorKey.FORM_PASSWORD_MISMATCH,
    path: ['confirmPassword'],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

//reset password schema
export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, { message: ErrorKey.FORM_PASSWORD }),
    confirmPassword: z.string().min(6, {
      message: ErrorKey.FORM_PASSWORD,
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: ErrorKey.FORM_PASSWORD_MISMATCH,
    path: ['confirmPassword'],
  });

export type resetPasswordInput = z.infer<typeof resetPasswordSchema>;

// forgot password schema
export const resendEmailSchema = z.object({
  email: z
    .string()
    .min(1, { message: ErrorKey.FORM_EMAIL_REQUIRED })
    .email({ message: ErrorKey.FORM_EMAIL }),
});

export type ResendEmailInput = z.infer<typeof resendEmailSchema>;
