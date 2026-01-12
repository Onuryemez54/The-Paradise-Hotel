import { ErrorKey, SuccessKey } from '../i18n/keys';

export enum AppToastSeverity {
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
  SUCCESS = 'success',
}

export const INFO_ERROR_CODES: ErrorKey[] = [
  ErrorKey.EMAIL_ALREADY_VERIFIED,
  ErrorKey.USER_EXISTS,
  ErrorKey.USER_EXISTS_UNVERIFIED,
  ErrorKey.USER_EXISTS_OAUTH,
  ErrorKey.RESET_RESTRICTED,
  ErrorKey.SAME_PASSWORD,
];

export const WARNING_ERROR_CODES: ErrorKey[] = [
  ErrorKey.EMAIL_NOT_VERIFIED,
  ErrorKey.INVALID_LINK,
  ErrorKey.NO_CODE,
  ErrorKey.NO_TOKEN,
  ErrorKey.EMAIL_VERIFICATION_FAILED,
  ErrorKey.BOOKING_OVERLAP,
  ErrorKey.FORM_INVALID,
  ErrorKey.FORM_MISSING,
  ErrorKey.FORM_INVALID_DATE,
  ErrorKey.FORM_INVALID_NUMBER,
  ErrorKey.SESSION_EXPIRED,
  ErrorKey.PASSWORD_RESET_REQUIRED,
];

export const ERROR_ERROR_CODES: ErrorKey[] = [
  // Auth
  ErrorKey.AUTH_REQUIRED,
  ErrorKey.LOGIN_FAILED,
  ErrorKey.REGISTER_FAILED,
  ErrorKey.OAUTH_FAILED,
  ErrorKey.RESET_MAIL_FAILED,
  ErrorKey.RESEND_FAILED,
  ErrorKey.PASSWORD_UPDATE_FAILED,
  ErrorKey.SESSION_FAILED,
  ErrorKey.USER_NOT_FOUND,

  // Booking
  ErrorKey.BOOKING_NOT_FOUND,
  ErrorKey.BOOKING_FORBIDDEN,
  ErrorKey.BOOKING_CREATE_FAILED,
  ErrorKey.BOOKING_UPDATE_FAILED,
  ErrorKey.BOOKING_DELETE_FAILED,

  // Data
  ErrorKey.ROOMS_FETCH_FAILED,
  ErrorKey.BOOKINGS_FETCH_FAILED,
  ErrorKey.COUNTRIES_FETCH_FAILED,
  ErrorKey.EXCHANGE_RATE_FAILED,

  // Profile
  ErrorKey.PROFILE_UPDATE_FAILED,

  // Generic
  ErrorKey.UNKNOWN,
  ErrorKey.INTERNAL_ERROR,
];

export const SUCCESS_CODES: SuccessKey[] = [
  // Auth
  SuccessKey.LOGGED_IN,
  SuccessKey.REGISTER,
  SuccessKey.RESET_EMAIL,
  SuccessKey.VERIFICATION_EMAIL,
  SuccessKey.EMAIL_VERIFIED,
  SuccessKey.PASSWORD_UPDATED,

  // Booking
  SuccessKey.BOOKING_CREATED,
  SuccessKey.BOOKING_UPDATED,
  SuccessKey.BOOKING_DELETED,

  // Profile
  SuccessKey.PROFILE_UPDATED,
];
