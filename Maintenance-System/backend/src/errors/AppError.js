export class AppError extends Error {
  constructor(message, { statusCode = 400, code = "APP_ERROR", field } = {}) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.field = field;
  }
}