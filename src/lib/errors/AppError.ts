import { appErrorStatusMap } from '@/types/errors/appErrorStatus';
import { ErrorKey } from '@/types/i18n/keys';

export class AppError extends Error {
  code: ErrorKey;
  status: number;

  constructor(code: ErrorKey, message?: string) {
    super(message ?? code);
    this.code = code;
    this.status = appErrorStatusMap[code];
  }
}
