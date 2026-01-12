import { ErrorKey, SuccessKey } from '@/types/i18n/keys';
import {
  AppToastSeverity,
  INFO_ERROR_CODES,
  SUCCESS_CODES,
  WARNING_ERROR_CODES,
} from '@/types/toast/toastSeverity';

export const getSeverityByCode = (
  code: ErrorKey | SuccessKey
): AppToastSeverity => {
  if (INFO_ERROR_CODES.includes(code as ErrorKey)) return AppToastSeverity.INFO;
  if (WARNING_ERROR_CODES.includes(code as ErrorKey))
    return AppToastSeverity.WARNING;
  if (SUCCESS_CODES.includes(code as SuccessKey))
    return AppToastSeverity.SUCCESS;
  return AppToastSeverity.ERROR;
};
