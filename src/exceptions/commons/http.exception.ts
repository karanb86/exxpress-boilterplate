export enum ApiErrorCode {
  MODEL_NOT_FOUND = 0,
  INVALID_CREDENTIALS = 202,

  // Auth
  AUTH_CREDENTIALS_INVALID = 101,
  USER_SIGNUP_LINK_EXPIRED = 102,
  USER_DETAILS_INVALID_EXCEPTION = 103,
  USER_UPDATE_INVALID_DETAILS = 104,
  PASSWORD_RESET_TOKEN_EXPIRED = 105,
  INVALID_PASSWORD = 106,

  // User
  USER_NOT_FOUND = 201,

  // Token
  TOKEN_NOT_FOUND = 401,

  // Database
  DATABASE_ERROR = 501,

  // Access Denied
  ACCESS_DENIED = 601,

  // Generic
  GENERAL_NOT_FOUND = 9996,
  GENERAL_THROTTLING = 9997,
  GENERAL_VALIDATION = 9998,
  GENERAL_UNKNOWN = 9999, // Reserved...
}

export class HttpException extends Error {
  /**
   * Message in english that explains the error
   *
   * It should be directly addressed to user
   * as in most cases this will be displayed to user.
   */
  message: string;

  /**
   * App Specific error code that uniquely identifies an error
   *
   * e.g. => When Requesting a specific entity with a specific id,
   * If it is not found, there should be a unique id associated with it
   * and using which frontend should redirect user back to the previous page
   */
  errorCode: number;

  /**
   * Http status code
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
   */
  statusCode: number;

  /**
   * Any additional data associated with a specific error.
   *
   * e.g. => Login API might want to send
   * number of attempts left on incorrect password
   */
  meta?: any;

  /**
   * Validation errors thrown by AJV
   * send as it is being thrown by the library...
   */
  errors?: any;

  constructor(
    message: string,
    errorCode: ApiErrorCode,
    statusCode: number,
    meta?: any,
    errors?: any
  ) {
    super(message);

    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;

    this.meta = meta;
    this.errors = errors;
  }
}
