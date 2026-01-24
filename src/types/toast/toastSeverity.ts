import { ErrorKey, SuccessKey } from '../i18n/keys';

export const INFO_ERROR_CODES: ErrorKey[] = [
  ErrorKey.EMAIL_ALREADY_VERIFIED,
  ErrorKey.USER_EXISTS,
  ErrorKey.USER_EXISTS_UNVERIFIED,
  ErrorKey.USER_EXISTS_OAUTH,
  ErrorKey.RESET_RESTRICTED,
  ErrorKey.SAME_PASSWORD,
];

export const WARNING_ERROR_CODES: ErrorKey[] = [
  // Auth / Session
  ErrorKey.EMAIL_NOT_VERIFIED,
  ErrorKey.INVALID_LINK,
  ErrorKey.NO_CODE,
  ErrorKey.NO_TOKEN,
  ErrorKey.SESSION_EXPIRED,
  ErrorKey.PASSWORD_RESET_REQUIRED,

  // Verification / reset flows
  ErrorKey.EMAIL_VERIFICATION_FAILED,

  // Booking
  ErrorKey.BOOKING_OVERLAP,
  ErrorKey.INVALID_BOOKING_DATES,
  ErrorKey.INVALID_SELECTED_RANGE,
  ErrorKey.INVALID_SELECTED_GUEST_NUMBER,
  ErrorKey.INVALID_RANGE_AND_GUEST,

  // Form
  ErrorKey.REQUIRED,
  ErrorKey.FORM_INVALID,
  ErrorKey.FORM_MISSING,
  ErrorKey.FORM_INVALID_DATE,
  ErrorKey.FORM_INVALID_NUMBER,
  ErrorKey.FORM_EMAIL_REQUIRED,
  ErrorKey.FORM_EMAIL,
  ErrorKey.FORM_PASSWORD,
  ErrorKey.FORM_PASSWORD_MISMATCH,
  ErrorKey.FORM_NAME,
  ErrorKey.FORM_MESSAGE_MIN_LENGTH,
  ErrorKey.FORM_MESSAGE_MAX_LENGTH,
  ErrorKey.FORM_NATIONAL_ID,
  ErrorKey.FORM_OBSERVATION,
  ErrorKey.MIN_2,
];

export const ERROR_ERROR_CODES: ErrorKey[] = [
  // Auth
  ErrorKey.AUTH_REQUIRED,
  ErrorKey.LOGIN_FAILED,
  ErrorKey.REGISTER_FAILED,
  ErrorKey.OAUTH_FAILED,
  ErrorKey.RESET_PASSWORD_FAILED,
  ErrorKey.RESEND_VERIFY_EMAIL_FAILED,
  ErrorKey.RESEND_RESET_PASSWORD_FAILED,
  ErrorKey.PASSWORD_UPDATE_FAILED,
  ErrorKey.INVALID_EMAIL,
  ErrorKey.SESSION_FAILED,
  ErrorKey.USER_NOT_FOUND,

  // User conflicts
  ErrorKey.USER_EXISTS,

  // Room
  ErrorKey.ROOMS_FETCH_FAILED,
  ErrorKey.ROOM_FETCH_FAILED,
  ErrorKey.ROOM_NOT_FOUND,
  ErrorKey.ROOM_TYPE_INVALID,

  // Booking
  ErrorKey.BOOKINGS_FETCH_FAILED,
  ErrorKey.BOOKING_NOT_FOUND,
  ErrorKey.BOOKING_FORBIDDEN,
  ErrorKey.BOOKING_CREATE_FAILED,
  ErrorKey.BOOKING_UPDATE_FAILED,
  ErrorKey.BOOKING_DELETE_FAILED,
  ErrorKey.BOOKING_DELETE_FORBIDDEN,

  // Settings / Data
  ErrorKey.SETTINGS_FETCH_FAILED,
  ErrorKey.SETTINGS_NOT_FOUND,

  // External APIs
  ErrorKey.COUNTRIES_FETCH_FAILED,
  ErrorKey.EXCHANGE_RATE_FAILED,

  // Profile
  ErrorKey.PROFILE_UPDATE_FAILED,
  ErrorKey.PROFILE_UPDATE_AUTH_FAILED,
  ErrorKey.PROFILE_IMAGE_UPLOAD_FAILED,

  // Generic
  ErrorKey.TOO_MANY_REQUESTS,
  ErrorKey.UNKNOWN,
  ErrorKey.INTERNAL_ERROR,
];

export const SUCCESS_CODES: SuccessKey[] = [
  // Auth
  SuccessKey.LOGOUT,
  SuccessKey.LOGGED_IN,
  SuccessKey.REGISTER,
  SuccessKey.EMAIL_VERIFIED,
  SuccessKey.PASSWORD_UPDATED,

  // Booking
  SuccessKey.BOOKING_CREATED,
  SuccessKey.BOOKING_UPDATED,
  SuccessKey.BOOKING_DELETED,

  // Profile
  SuccessKey.PROFILE_UPDATED,

  // feedback
  SuccessKey.FEEDBACK_SENT,
];
