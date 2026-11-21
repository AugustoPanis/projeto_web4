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

    case "P2002": {
      const target = error.meta?.target;
      const fields = Array.isArray(target) ? target.join(",") : String(target ?? "");

      if (fields.includes("patrymony")) {
        return new AppError("Patrimônio já cadastrado", { statusCode: 409, code: "DUPLICATE_PATRIMONY", field: "patrymony" });
      }
      if (fields.includes("cep")) {
        return new AppError("CEP já cadastrado", { statusCode: 409, code: "DUPLICATE_CEP", field: "cep" });
      }
      if (fields.includes("descriptionCategory")) {
        return new AppError("Categoria já cadastrada", { statusCode: 409, code: "DUPLICATE_CATEGORY", field: "descriptionCategory" });
      }
      if (fields.includes("email")) {
        return new AppError("E-mail já cadastrado", { statusCode: 409, code: "EMAIL_ALREADY_IN_USE", field: "email" });
      }
      return new AppError("Registro já cadastrado", { statusCode: 409, code: "DUPLICATE_RECORD" });
    }

    case "P2025":
      return new AppError("Registro não encontrado", { statusCode: 404, code: "RECORD_NOT_FOUND" });

    case "P2003":
      return new AppError("Registro em uso e não pode ser removido", { statusCode: 409, code: "RECORD_IN_USE" });

    default:
      return error;
  }
};