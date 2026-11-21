import { AppError } from "../errors/AppError.js";

export function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
      field: err.field,
    });
  }

console.log(err.code, err.meta);

  return res.status(500).json({
    code: "INTERNAL_ERROR",
    message: "Erro interno do servidor",
  });
}