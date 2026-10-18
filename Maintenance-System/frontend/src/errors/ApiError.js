export class ApiError extends Error {
  constructor(message, { status, code, field, cause} = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.field = field;
    this.cause = cause;
  }
}