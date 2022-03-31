import { ApiErrorCode, HttpException } from './http.exception';

export class ModelNotFoundException extends HttpException {
  constructor(
    message: string = 'Model not found',
    errorCode: ApiErrorCode = ApiErrorCode.MODEL_NOT_FOUND,
    meta?: any
  ) {
    super(message, errorCode, 404, meta);
  }
}
