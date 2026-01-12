import { ErrorKey } from '../i18n/keys';

export const appErrorStatusMap: Record<ErrorKey, number> = {
  // Auth
  [ErrorKey.AUTH_REQUIRED]: 401,
  [ErrorKey.LOGIN_FAILED]: 401,
  [ErrorKey.REGISTER_FAILED]: 400,
  [ErrorKey.OAUTH_FAILED]: 401,
  [ErrorKey.RESET_MAIL_FAILED]: 500,
  [ErrorKey.RESEND_FAILED]: 500,
  [ErrorKey.PASSWORD_UPDATE_FAILED]: 500,
  [ErrorKey.INVALID_EMAIL]: 400,
  [ErrorKey.EMAIL_NOT_VERIFIED]: 403,
  [ErrorKey.EMAIL_VERIFICATION_FAILED]: 500,
  [ErrorKey.RESET_RESTRICTED]: 403,
  [ErrorKey.EMAIL_ALREADY_VERIFIED]: 400,
  [ErrorKey.PASSWORD_RESET_REQUIRED]: 403,

  [ErrorKey.NO_CODE]: 400,
  [ErrorKey.NO_TOKEN]: 400,
  [ErrorKey.INVALID_LINK]: 400,
  [ErrorKey.SESSION_FAILED]: 500,
  [ErrorKey.SAME_PASSWORD]: 400,

  [ErrorKey.USER_NOT_FOUND]: 404,
  [ErrorKey.USER_EXISTS]: 409,
  [ErrorKey.USER_EXISTS_UNVERIFIED]: 409,
  [ErrorKey.USER_EXISTS_OAUTH]: 409,
  // room
  [ErrorKey.ROOM_TYPE_INVALID]: 400,

  // Booking
  [ErrorKey.BOOKING_OVERLAP]: 409,
  [ErrorKey.BOOKING_NOT_FOUND]: 404,
  [ErrorKey.BOOKING_FORBIDDEN]: 403,
  [ErrorKey.BOOKING_CREATE_FAILED]: 500,
  [ErrorKey.BOOKING_UPDATE_FAILED]: 500,
  [ErrorKey.BOOKING_DELETE_FAILED]: 500,

  // Form
  [ErrorKey.FORM_INVALID]: 400,
  [ErrorKey.FORM_MISSING]: 400,
  [ErrorKey.FORM_INVALID_NUMBER]: 400,
  [ErrorKey.FORM_INVALID_DATE]: 400,
  [ErrorKey.FORM_EMAIL_REQUIRED]: 400,
  [ErrorKey.FORM_EMAIL]: 400,
  [ErrorKey.FORM_PASSWORD]: 400,
  [ErrorKey.FORM_PASSWORD_MISMATCH]: 400,
  [ErrorKey.FORM_NAME]: 400,
  [ErrorKey.FORM_NATIONAL_ID]: 400,
  [ErrorKey.FORM_OBSERVATION]: 400,
  [ErrorKey.MIN_2]: 400,

  // Data
  [ErrorKey.ROOMS_FETCH_FAILED]: 500,
  [ErrorKey.BOOKINGS_FETCH_FAILED]: 500,
  [ErrorKey.COUNTRIES_FETCH_FAILED]: 500,
  [ErrorKey.EXCHANGE_RATE_FAILED]: 502,

  // Profile
  [ErrorKey.PROFILE_UPDATE_FAILED]: 500,

  // Generic
  [ErrorKey.UNKNOWN]: 500,
  [ErrorKey.INTERNAL_ERROR]: 500,
};
