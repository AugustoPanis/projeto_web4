const authService = {
  async authenticate({ email, password }) {
    // Exemplo de regra de negócio: consultar o utilizador na BD
    // const user = await UserRepository.findByEmail(email);
    // if (!user) throw new Error("Credenciais inválidas.");

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) throw new Error("Credenciais inválidas.");

    if (email !== "augustopanis13@gmail.com" || password !== "123456") {
      throw new Error("Credenciais inválidas.");
    }

    // Gerar o token (ex.: via jsonwebtoken)
    const token = "exemplo_jwt_token";

    return {
      user: { email },
      token
    };
  }
};

module.exports = authService;