import { AppError } from '@/lib/errors/AppError';
import { ErrorKey } from '@/types/i18n/keys';

export const getRequiredString = (form: FormData, key: string): string => {
  const value = form.get(key);
  if (typeof value !== 'string') {
    throw new AppError(ErrorKey.FORM_MISSING);
  }
  return value;
};

export const getOptionalString = (
  form: FormData,
  key: string
): string | null => {
  const value = form.get(key);
  return typeof value === 'string' ? value : null;
};

export const getRequiredNumber = (form: FormData, key: string): number => {
  const raw = getRequiredString(form, key);
  const num = Number(raw);
  if (Number.isNaN(num)) {
    throw new AppError(ErrorKey.FORM_INVALID_NUMBER);
  }
  return num;
};

export const getRequiredDate = (form: FormData, key: string): Date => {
  const raw = getRequiredString(form, key);
  const date = new Date(raw);
  if (isNaN(date.getTime())) {
    throw new AppError(ErrorKey.FORM_INVALID_DATE);
  }
  return date;
};
