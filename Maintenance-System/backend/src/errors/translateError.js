import { AppError } from "./AppError.js";

export const translateError = (error) => {
  if (error instanceof AppError) return error;

  switch (error.code) {
    case "auth/email-already-exists":
      return new AppError("E-mail já cadastrado", { statusCode: 409, code: "EMAIL_ALREADY_IN_USE", field: "email" });
    case "auth/invalid-email":
      return new AppError("E-mail inválido", { statusCode: 400, code: "INVALID_EMAIL", field: "email" });
    case "auth/invalid-password":
      return new AppError("Senha inválida", { statusCode: 400, code: "WEAK_PASSWORD", field: "password" });
    case "P2002":
      return new AppError("CPF ou e-mail já cadastrado", { statusCode: 409, code: "DUPLICATE_CPF_OR_EMAIL" });
    default:
      return error;
  }
};