import { ErrorKey, SuccessKey } from '@/types/i18n/keys';
import {
  INFO_ERROR_CODES,
  SUCCESS_CODES,
  WARNING_ERROR_CODES,
} from '@/types/toast/toastSeverity';
import { ToastType } from '@/types/toast/toastTypes';

export const getSeverityByCode = (code: ErrorKey | SuccessKey): ToastType => {
  if (INFO_ERROR_CODES.includes(code as ErrorKey)) return ToastType.INFO;
  if (WARNING_ERROR_CODES.includes(code as ErrorKey)) return ToastType.WARNING;
  if (SUCCESS_CODES.includes(code as SuccessKey)) return ToastType.SUCCESS;
  return ToastType.ERROR;
};
